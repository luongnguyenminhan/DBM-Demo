/**
 * Interface for a meeting note section
 */
interface MeetingNoteSection {
  title: string;
  level: number;
  content?: string;
  subsections?: MeetingNoteSection[];
  items?: MeetingNoteItem[];
}

/**
 * Interface for list items in meeting notes
 */
interface MeetingNoteItem {
  text: string;
  level: number;
  subitems?: string[];
  nestedItems?: MeetingNoteItem[];
}

/**
 * Parses a raw meeting note string into a structured format
 * @param noteText Raw meeting note text
 * @returns Structured meeting note sections
 */
export const parseMeetingNote = (noteText: string): MeetingNoteSection[] => {
  if (!noteText) return [];

  // Clean up the text - handle escaped newlines
  const cleanText = noteText.replace(/\\n/g, '\n').trim();
  const lines = cleanText.split('\n').filter(line => line.trim().length > 0);
  
  const result: MeetingNoteSection[] = [];
  
  let currentMainSection: MeetingNoteSection | null = null;
  let currentSubSection: MeetingNoteSection | null = null;
  let currentSubSubSection: MeetingNoteSection | null = null;
  let currentListItem: MeetingNoteItem | null = null;
  let currentParentItem: MeetingNoteItem | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    const indentLevel = line.length - trimmedLine.length;
    
    // Skip greeting lines
    if (trimmedLine.startsWith('Dạ, em đã sẵn sàng')) continue;
    
    // Check for main section headers (## TITLE)
    if (trimmedLine.startsWith('## ')) {
      const title = trimmedLine.replace('## ', '').trim();
      currentMainSection = { title, level: 1, subsections: [] };
      result.push(currentMainSection);
      currentSubSection = null;
      currentSubSubSection = null;
      currentListItem = null;
      currentParentItem = null;
    }
    // Check for section headers (### A. TITLE)
    else if (trimmedLine.startsWith('### ')) {
      const title = trimmedLine.replace('### ', '').trim();
      currentSubSection = { title, level: 2, subsections: [] };
      
      if (currentMainSection && currentMainSection.subsections) {
        currentMainSection.subsections.push(currentSubSection);
      } else {
        result.push(currentSubSection);
      }
      currentSubSubSection = null;
      currentListItem = null;
      currentParentItem = null;
    }
    // Check for subsections (#### 1. TITLE)
    else if (trimmedLine.startsWith('#### ')) {
      const title = trimmedLine.replace('#### ', '').trim();
      currentSubSubSection = { title, level: 3, items: [] };
      
      if (currentSubSection) {
        if (!currentSubSection.subsections) {
          currentSubSection.subsections = [];
        }
        currentSubSection.subsections.push(currentSubSubSection);
      } else if (currentMainSection) {
        if (!currentMainSection.subsections) {
          currentMainSection.subsections = [];
        }
        currentMainSection.subsections.push({ 
          title: "Additional Details", 
          level: 2, 
          subsections: [currentSubSubSection]
        });
      } else {
        if (!result.length) {
          result.push({ title: "Meeting Notes", level: 1, subsections: [] });
        }
        if (!result[0].subsections) {
          result[0].subsections = [];
        }
        result[0].subsections.push(currentSubSubSection);
      }
      
      currentListItem = null;
      currentParentItem = null;
    }
    // Check for list items (- or * with varying indentation)
    else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      const text = trimmedLine.substring(2).trim();
      
      // Determine if this is a top-level or nested item based on indentation
      if (indentLevel < 6) {
        // Top level item
        currentListItem = { text, level: 1, subitems: [], nestedItems: [] };
        currentParentItem = currentListItem;
        
        if (currentSubSubSection) {
          if (!currentSubSubSection.items) {
            currentSubSubSection.items = [];
          }
          currentSubSubSection.items.push(currentListItem);
        } else if (currentSubSection) {
          if (!currentSubSection.items) {
            currentSubSection.items = [];
          }
          currentSubSection.items.push(currentListItem);
        } else if (currentMainSection) {
          if (!currentMainSection.items) {
            currentMainSection.items = [];
          }
          currentMainSection.items.push(currentListItem);
        }
      } else {
        // This is a nested item (with indentation)
        const nestedItem = { text, level: 2, subitems: [] };
        
        // Add to parent item's nested items
        if (currentParentItem) {
          if (!currentParentItem.nestedItems) {
            currentParentItem.nestedItems = [];
          }
          currentParentItem.nestedItems.push(nestedItem);
          currentListItem = nestedItem;
        } else {
          // Fallback if parent item not found
          if (currentSubSubSection) {
            if (!currentSubSubSection.items) {
              currentSubSubSection.items = [];
            }
            currentSubSubSection.items.push({ text, level: 1 });
            currentListItem = currentSubSubSection.items[currentSubSubSection.items.length - 1];
          }
        }
      }
    }
    // Check for sub-list items with + marker
    else if (trimmedLine.startsWith('+ ')) {
      const text = trimmedLine.substring(2).trim();
      
      if (currentListItem && !currentListItem.subitems) {
        currentListItem.subitems = [];
      }
      
      if (currentListItem && currentListItem.subitems) {
        currentListItem.subitems.push(text);
      }
    }
    // Regular content or content inside a section
    else if (!trimmedLine.startsWith('#')) {
      // If line has significant indentation and follows a subsubsection, it may be content for that section
      if (indentLevel >= 6 && currentSubSubSection) {
        // Check if this is part of a multi-line content for a subsection
        if (currentSubSubSection.content) {
          currentSubSubSection.content += '\n' + trimmedLine;
        } else {
          currentSubSubSection.content = trimmedLine;
        }
      } 
      // If line follows a subsection directly
      else if (currentSubSection) {
        if (currentSubSection.content) {
          currentSubSection.content += '\n' + trimmedLine;
        } else {
          currentSubSection.content = trimmedLine;
        }
      }
      // Otherwise, add to main section
      else if (currentMainSection) {
        if (currentMainSection.content) {
          currentMainSection.content += '\n' + trimmedLine;
        } else {
          currentMainSection.content = trimmedLine;
        }
      }
    }
  }
  
  return result;
};

/**
 * Formats a meeting note for display
 * @param noteText The raw meeting note text
 * @returns Formatted HTML string
 */
export const formatMeetingNoteForDisplay = (noteText: string): string => {
  if (!noteText) return '';
  
  const parsedSections = parseMeetingNote(noteText);
  let html = '';
  
  // Helper function to render list items
  const renderListItems = (items: MeetingNoteItem[] | undefined) => {
    if (!items || items.length === 0) return '';
    
    let result = '<ul class="list-disc pl-5 space-y-1">';
    for (const item of items) {
      result += `<li class="text-gray-800 font-medium">
        ${item.text}`;
      
      // Render nested items (second level)
      if (item.nestedItems && item.nestedItems.length > 0) {
        result += '<ul class="list-[circle] pl-5 mt-1 space-y-1">';
        for (const nestedItem of item.nestedItems) {
          result += `<li class="text-gray-700">${nestedItem.text}`;
          
          // Render subitems of nested items (third level)
          if (nestedItem.subitems && nestedItem.subitems.length > 0) {
            result += '<ul class="list-[square] pl-5 mt-1 space-y-1">';
            for (const subitem of nestedItem.subitems) {
              result += `<li class="text-gray-600">${subitem}</li>`;
            }
            result += '</ul>';
          }
          
          result += '</li>';
        }
        result += '</ul>';
      }
      // Render direct subitems (for + items)
      else if (item.subitems && item.subitems.length > 0) {
        result += '<ul class="list-[square] pl-5 mt-1 space-y-1">';
        for (const subitem of item.subitems) {
          result += `<li class="text-gray-700">${subitem}</li>`;
        }
        result += '</ul>';
      }
      
      result += '</li>';
    }
    result += '</ul>';
    
    return result;
  };
  
  // Render each section
  for (const section of parsedSections) {
    html += `<div class="meeting-section mb-6">
      <h2 class="text-xl font-bold text-[var(--color-primary)] mb-3">${section.title}</h2>`;
    
    // Render main section content if available
    if (section.content) {
      html += `<p class="mb-3 text-gray-800">${section.content}</p>`;
    }
    
    // Render main section items if available
    html += renderListItems(section.items);
    
    // Render subsections
    if (section.subsections && section.subsections.length > 0) {
      for (const subsection of section.subsections) {
        html += `<div class="meeting-subsection mb-4 mt-4">
          <h3 class="text-lg font-semibold text-[var(--color-secondary)] mb-2">${subsection.title}</h3>`;
        
        // Render subsection content
        if (subsection.content) {
          html += `<p class="mb-3 text-gray-800">${subsection.content}</p>`;
        }
        
        // Render subsection items
        html += renderListItems(subsection.items);
        
        // Render subsubsections
        if (subsection.subsections && subsection.subsections.length > 0) {
          for (const subsubsection of subsection.subsections) {
            html += `<div class="meeting-subsubsection mb-3 mt-2 pl-4 border-l-2 border-gray-200">
              <h4 class="text-md font-medium mb-2">${subsubsection.title}</h4>`;
            
            // Render subsubsection content
            if (subsubsection.content) {
              html += `<p class="mb-2 text-gray-800">${subsubsection.content}</p>`;
            }
            
            // Render subsubsection items
            html += renderListItems(subsubsection.items);
            html += `</div>`;
          }
        }
        
        html += `</div>`;
      }
    }
    
    html += `</div>`;
  }
  
  return html;
};

/**
 * Extracts key information from a meeting note
 * @param noteText The meeting note text
 * @returns Object with key meeting information
 */
export const extractMeetingInfo = (noteText: string) => {
  const parsedSections = parseMeetingNote(noteText);
  const result = {
    title: '',
    date: '',
    attendees: '',
    agenda: '',
    goals: '',
  };
  
  // Extract information
  for (const section of parsedSections) {
    // Get the title from the first main section
    if (!result.title && section.title) {
      result.title = section.title;
    }
    
    // Look through subsections to find information
    if (section.subsections) {
      for (const subsection of section.subsections) {
        // Check if this is the INFORMATION section
        if (subsection.title.includes('THÔNG TIN') || subsection.title.includes('A.')) {
          // Process information subsections
          if (subsection.subsections) {
            for (const subsubsection of subsection.subsections) {
              const title = subsubsection.title.toLowerCase();
              
              if (title.includes('date') || title.includes('1.')) {
                result.date = subsubsection.content || '';
              } else if (title.includes('attendance') || title.includes('2.')) {
                result.attendees = subsubsection.content || '';
              } else if (title.includes('agenda') || title.includes('3.') || title.includes('outline')) {
                result.agenda = subsubsection.content || '';
              }
            }
          }
        }
        
        // Check if this is KEY POINTS section
        if (subsection.title.includes('KEY POINTS') || subsection.title.includes('B.')) {
          // Process key points subsections
          if (subsection.subsections) {
            for (const subsubsection of subsection.subsections) {
              const title = subsubsection.title.toLowerCase();
              
              if (title.includes('goal') || title.includes('5.')) {
                result.goals = subsubsection.content || '';
              }
            }
          }
        }
      }
    }
  }
  
  return result;
};
