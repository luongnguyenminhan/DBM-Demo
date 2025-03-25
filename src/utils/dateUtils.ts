interface MeetingSection {
    title: string;
    content: string | MeetingSubsection[];
    level: number;
  }
  
interface MeetingSubsection {
title: string;
content: string | string[] | SubItem[];
level: number;
}

interface SubItem {
title: string;
items: string[];
}

/**
 * Parses a formatted meeting note into structured sections
 * @param noteContent The raw meeting note content
 * @returns An array of structured meeting note sections
 */
export const parseMeetingNote = (noteContent: string): MeetingSection[] => {
if (!noteContent) return [];

const sections: MeetingSection[] = [];
const lines = noteContent.split('\n').filter(line => line.trim());

let currentSection: MeetingSection | null = null;
let currentSubsection: MeetingSubsection | null = null;
let currentSubItem: SubItem | null = null;

for (const line of lines) {
    // Main section headers (### A. SECTION)
    if (line.startsWith('### ')) {
    if (currentSection) sections.push(currentSection);
    
    currentSection = {
        title: line.replace('### ', '').trim(),
        content: [],
        level: 1
    };
    currentSubsection = null;
    currentSubItem = null;
    }
    // Subsection headers (#### 1. SUBSECTION)
    else if (line.startsWith('#### ')) {
    if (currentSection && currentSubsection) {
        (currentSection.content as MeetingSubsection[]).push(currentSubsection);
    }
    
    currentSubsection = {
        title: line.replace('#### ', '').trim(),
        content: '',
        level: 2
    };
    
    if (currentSection) {
        if (!Array.isArray(currentSection.content)) {
        currentSection.content = [];
        }
    }
    
    currentSubItem = null;
    }
    // List items (- or * )
    else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
    const content = line.trim().substring(2);
    
    if (currentSubsection) {
        if (typeof currentSubsection.content === 'string') {
        currentSubsection.content = [];
        }
        
        if (line.startsWith('      - ') || line.startsWith('      * ')) {
        // This is a sub-item
        if (currentSubItem) {
            currentSubItem.items.push(content);
        } else {
            currentSubItem = {
            title: '',
            items: [content]
            };
            
            if (Array.isArray(currentSubsection.content)) {
            currentSubsection.content.push(currentSubItem);
            }
        }
        } else {
        // This is a main list item
        currentSubItem = null;
        if (Array.isArray(currentSubsection.content)) {
            currentSubsection.content.push(content);
        }
        }
    }
    }
    // Sub list items with indentation
    else if (line.trim().startsWith('+ ')) {
    const content = line.trim().substring(2);
    
    if (currentSubItem && currentSubsection) {
        currentSubItem.items.push(content);
    }
    }
    // Regular content line
    else if (currentSubsection && line.trim() !== '') {
    // Add to existing content if it's a regular line
    if (typeof currentSubsection.content === 'string') {
        if (currentSubsection.content) {
        currentSubsection.content += '\n' + line;
        } else {
        currentSubsection.content = line;
        }
    }
    }
}

// Add the last subsection if it exists
if (currentSection && currentSubsection) {
    (currentSection.content as MeetingSubsection[]).push(currentSubsection);
}

// Add the last section if it exists
if (currentSection) {
    sections.push(currentSection);
}

return sections;
};

/**
 * Extracts meeting details like date, attendees, etc. from parsed meeting notes
 * @param parsedNote The parsed meeting note structure
 * @returns An object containing key meeting details
 */
export const extractMeetingDetails = (parsedNote: MeetingSection[]) => {
const details: Record<string, any> = {
    date: '',
    attendees: [],
    agenda: '',
    goals: '',
    decisions: [],
    actionItems: [],
    nextSteps: []
};

// Find the Information section to extract date and attendees
const infoSection = parsedNote.find(section => 
    section.title.includes('THÔNG TIN') || section.title.includes('INFORMATION'));

if (infoSection && Array.isArray(infoSection.content)) {
    // Extract date
    const dateSubsection = infoSection.content.find(sub => 
    sub.title.includes('Date') || sub.title.includes('Ngày'));
    if (dateSubsection && typeof dateSubsection.content === 'string') {
    details.date = dateSubsection.content.trim();
    }
    
    // Extract attendees
    const attendeesSubsection = infoSection.content.find(sub => 
    sub.title.includes('Attendance') || sub.title.includes('Người tham dự'));
    if (attendeesSubsection && typeof attendeesSubsection.content === 'string') {
    details.attendees = attendeesSubsection.content.split(',').map(a => a.trim());
    }
    
    // Extract agenda
    const agendaSubsection = infoSection.content.find(sub => 
    sub.title.includes('Agenda') || sub.title.includes('Chương trình'));
    if (agendaSubsection && typeof agendaSubsection.content === 'string') {
    details.agenda = agendaSubsection.content.trim();
    }
}

// Find the Key Points section to extract goals
const keyPointsSection = parsedNote.find(section => 
    section.title.includes('KEY POINTS') || section.title.includes('ĐIỂM CHÍNH'));

if (keyPointsSection && Array.isArray(keyPointsSection.content)) {
    // Extract goals
    const goalsSubsection = keyPointsSection.content.find(sub => 
    sub.title.includes('Goal') || sub.title.includes('Mục tiêu'));
    if (goalsSubsection && typeof goalsSubsection.content === 'string') {
    details.goals = goalsSubsection.content.trim();
    }
}

// Find the Decisions & Actions section
const decisionsSection = parsedNote.find(section => 
    section.title.includes('DECISIONS') || section.title.includes('QUYẾT ĐỊNH'));

if (decisionsSection && Array.isArray(decisionsSection.content)) {
    // Extract decisions
    const decisionsSubsection = decisionsSection.content.find(sub => 
    sub.title.includes('Decision') || sub.title.includes('Quyết định'));
    if (decisionsSubsection && typeof decisionsSubsection.content === 'string') {
    details.decisions = decisionsSubsection.content.trim();
    } else if (decisionsSubsection && Array.isArray(decisionsSubsection.content)) {
    details.decisions = decisionsSubsection.content;
    }
    
    // Extract action items
    const actionItemsSubsection = decisionsSection.content.find(sub => 
    sub.title.includes('Action Items') || sub.title.includes('Hành động'));
    if (actionItemsSubsection && Array.isArray(actionItemsSubsection.content)) {
    details.actionItems = actionItemsSubsection.content;
    }
}

// Find the Follow-up section
const followUpSection = parsedNote.find(section => 
    section.title.includes('FOLLOW-UP') || section.title.includes('THEO DÕI'));

if (followUpSection && Array.isArray(followUpSection.content)) {
    // Extract next steps
    const nextStepsSubsection = followUpSection.content.find(sub => 
    sub.title.includes('Next Steps') || sub.title.includes('Bước tiếp theo'));
    if (nextStepsSubsection && typeof nextStepsSubsection.content === 'string') {
    details.nextSteps = nextStepsSubsection.content.trim();
    } else if (nextStepsSubsection && Array.isArray(nextStepsSubsection.content)) {
    details.nextSteps = nextStepsSubsection.content;
    }
}

return details;
};

/**
 * Formats a meeting note in a structured format for display
 * @param noteContent The raw meeting note content
 * @returns An HTML string for displaying the meeting note
 */
export const formatMeetingNoteForDisplay = (noteContent: string): string => {
if (!noteContent) return '';

const parsedNote = parseMeetingNote(noteContent);
const details = extractMeetingDetails(parsedNote);

// Format the meeting note as HTML for better display
let formattedNote = `
    <div class="meeting-note">
    <div class="meeting-header">
        <h2>Meeting Note</h2>
        ${details.date ? `<div class="meeting-date"><strong>Date:</strong> ${details.date}</div>` : ''}
        ${details.attendees?.length > 0 ? 
        `<div class="meeting-attendees"><strong>Attendees:</strong> ${details.attendees.join(', ')}</div>` : ''}
        ${details.agenda ? `<div class="meeting-agenda"><strong>Agenda:</strong> ${details.agenda}</div>` : ''}
    </div>
    
    <div class="meeting-body">
`;

// Format each section
parsedNote.forEach(section => {
    formattedNote += `<div class="meeting-section">
    <h3>${section.title}</h3>`;
    
    if (Array.isArray(section.content)) {
    section.content.forEach(subsection => {
        formattedNote += `<div class="meeting-subsection">
        <h4>${subsection.title}</h4>`;
        
        if (typeof subsection.content === 'string') {
        formattedNote += `<p>${subsection.content}</p>`;
        } else if (Array.isArray(subsection.content)) {
        formattedNote += `<ul>`;
        subsection.content.forEach(item => {
            if (typeof item === 'string') {
            formattedNote += `<li>${item}</li>`;
            } else {
            // If this is a complex item with sub-items
            formattedNote += `<li>${item.title || ''}
                <ul>`;
            item.items.forEach(subItem => {
                formattedNote += `<li>${subItem}</li>`;
            });
            formattedNote += `</ul>
            </li>`;
            }
        });
        formattedNote += `</ul>`;
        }
        
        formattedNote += `</div>`;
    });
    } else {
    formattedNote += `<p>${section.content}</p>`;
    }
    
    formattedNote += `</div>`;
});

formattedNote += `
    </div>
    </div>
`;

return formattedNote;
};

/**
 * Helper function to get styled Markdown format for the meeting note
 * @param noteContent The raw meeting note content
 * @returns A styled Markdown string for the note content
 */
export const getMeetingNoteMarkdown = (noteContent: string): string => {
if (!noteContent) return '';

const parsedNote = parseMeetingNote(noteContent);

// Convert to a more readable Markdown format
let markdown = '';

parsedNote.forEach(section => {
    markdown += `## ${section.title}\n\n`;
    
    if (Array.isArray(section.content)) {
    section.content.forEach(subsection => {
        markdown += `### ${subsection.title}\n\n`;
        
        if (typeof subsection.content === 'string') {
        markdown += `${subsection.content}\n\n`;
        } else if (Array.isArray(subsection.content)) {
        subsection.content.forEach(item => {
            if (typeof item === 'string') {
            markdown += `- ${item}\n`;
            } else {
            // If this is a complex item with sub-items
            markdown += `- ${item.title || ''}\n`;
            item.items.forEach(subItem => {
                markdown += `  - ${subItem}\n`;
            });
            }
        });
        markdown += '\n';
        }
    });
    } else {
    markdown += `${section.content}\n\n`;
    }
});

return markdown;
};
