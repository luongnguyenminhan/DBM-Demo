/**
 * Interface for a transcript summary
 */
interface TranscriptSummary {
  totalParagraphs: number;
  positive: number;
  neutral: number;
  negative: number;
  positivePercentage: string;
  neutralPercentage: string;
  negativePercentage: string;
}

/**
 * Interface for a transcript message
 */
interface TranscriptMessage {
  speaker: string;
  timestamp: string;
  text: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  sentimentScore?: string;
}

/**
 * Enum for transcript types
 */
enum TranscriptType {
  SENTIMENT = 'sentiment',
  STANDARD = 'standard',
}

/**
 * Detects the type of transcript based on its content
 * @param transcriptText Raw transcript text
 * @returns The detected transcript type
 */
export const detectTranscriptType = (transcriptText: string): TranscriptType => {
  if (!transcriptText) return TranscriptType.STANDARD;
  
  // Check for sentiment analysis summary section
  if (transcriptText.includes('SENTIMENT ANALYSIS SUMMARY') || 
      transcriptText.includes('⚪') || 
      transcriptText.includes('🔴') || 
      transcriptText.includes('🟢')) {
    return TranscriptType.SENTIMENT;
  }
  
  return TranscriptType.STANDARD;
};

/**
 * Processes a transcript with sentiment analysis
 * @param transcriptText Raw transcript text with sentiment indicators
 * @returns Object with transcript summary and messages
 */
export const processSentimentTranscript = (transcriptText: string) => {
  if (!transcriptText) {
    return {
      summary: null,
      messages: [],
      type: TranscriptType.SENTIMENT
    };
  }

  const lines = transcriptText.split('\n').filter(line => line.trim());
  const messages: TranscriptMessage[] = [];
  let summary: TranscriptSummary | null = null;
  
  // Track if we're in the summary section
  let inSummary = false;
  let summaryLines: string[] = [];

  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for summary section
    if (line.startsWith('📊 SENTIMENT ANALYSIS SUMMARY')) {
      inSummary = true;
      summaryLines.push(line);
      continue;
    }
    
    // If we're in summary section, collect summary data
    if (inSummary) {
      summaryLines.push(line);
      if (line.startsWith('═══════')) {
        inSummary = line.length < 30; // End of summary when we see a shorter separator line
      }
      continue;
    }
    
    // Check for message pattern: SPEAKER_X [date time]
    const speakerMatch = line.match(/^(\w+)(?:\s+\[([\d/]+\s+[\d:]+\s+[AP]M)\])?/i);
    if (speakerMatch) {
      const speaker = speakerMatch[1];
      const timestamp = speakerMatch[2] || "";
      
      // Try to find sentiment indicator in the next line
      let sentimentIcon = '⚪';
      let text = '';
      let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
      let score = '0';
      
      // Look at the next line for sentiment information
      if (i + 1 < lines.length) {
        const messageLine = lines[++i].trim();
        
        // Check if the line contains a sentiment icon
        if (messageLine.startsWith('🔴') || messageLine.startsWith('⚪') || messageLine.startsWith('🟢')) {
          sentimentIcon = messageLine[0];
          text = messageLine.substring(1).trim();
          
          // Determine sentiment from icon
          if (sentimentIcon === '🟢') sentiment = 'positive';
          else if (sentimentIcon === '🔴') sentiment = 'negative';
          else sentiment = 'neutral';
          
          // Try to extract sentiment score
          const scoreLine = text.match(/\[(POS|NEU|NEG):(\d+\.\d+)%\]$/);
          
          if (scoreLine) {
            // Score is in the same line as the message
            sentiment = scoreLine[1] === 'POS' ? 'positive' : (scoreLine[1] === 'NEG' ? 'negative' : 'neutral');
            score = scoreLine[2];
            text = text.replace(/\[(POS|NEU|NEG):\d+\.\d+%\]$/, '').trim();
          }
        }
      }
      
      // Add the message to our collection
      messages.push({
        speaker,
        timestamp,
        text,
        sentiment,
        sentimentScore: score
      });
    }
  }
  
  // Parse the summary
  if (summaryLines.length > 0) {
    const totalMatch = summaryLines.join(' ').match(/Total paragraphs: (\d+)/);
    const positiveMatch = summaryLines.join(' ').match(/Positive: (\d+) \((\d+\.\d+)%\)/);
    const neutralMatch = summaryLines.join(' ').match(/Neutral: (\d+) \((\d+\.\d+)%\)/);
    const negativeMatch = summaryLines.join(' ').match(/Negative: (\d+) \((\d+\.\d+)%\)/);
    
    if (totalMatch && positiveMatch && neutralMatch && negativeMatch) {
      summary = {
        totalParagraphs: parseInt(totalMatch[1]),
        positive: parseInt(positiveMatch[1]),
        neutral: parseInt(neutralMatch[1]),
        negative: parseInt(negativeMatch[1]),
        positivePercentage: positiveMatch[2],
        neutralPercentage: neutralMatch[2],
        negativePercentage: negativeMatch[2]
      };
    }
  }
  
  return {
    summary,
    messages,
    type: TranscriptType.SENTIMENT
  };
};

/**
 * Processes a standard transcript without sentiment analysis
 * @param transcriptText Raw transcript text
 * @returns Object with transcript messages
 */
export const processStandardTranscript = (transcriptText: string) => {
    if (!transcriptText) {
        return {
            messages: [],
            type: TranscriptType.STANDARD
        };
    }

    const lines = transcriptText.split('\n').filter(line => line.trim());
    const messages: TranscriptMessage[] = [];

    // Process each line to find speaker messages
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Check for pattern: SPEAKER_X [date time]
        const speakerMatch = line.match(/^(\w+)(?:\s+\[([\d/]+\s+[\d:]+\s+[AP]M)\])?/i);
        if (speakerMatch) {
            const speaker = speakerMatch[1];
            const timestamp = speakerMatch[2] || "";
            
            // The text is on the next line
            let text = '';
            if (i + 1 < lines.length) {
                text = lines[++i].trim();
            }
            
            messages.push({
                speaker,
                timestamp,
                text
            });
        }
    }
    
    return {
        messages,
        type: TranscriptType.STANDARD
    };
};

/**
 * Main function to process any type of transcript
 * @param transcriptText Raw transcript text
 * @returns Processed transcript data
 */
export const processTranscript = (transcriptText: string) => {
  const type = detectTranscriptType(transcriptText);
  
  if (type === TranscriptType.SENTIMENT) {
    return processSentimentTranscript(transcriptText);
  } else {
    return processStandardTranscript(transcriptText);
  }
};

/**
 * Formats a sentiment transcript for display
 * @param transcriptText Raw transcript text with sentiment
 * @returns HTML string representation
 */
export const formatSentimentTranscriptForDisplay = (data: ReturnType<typeof processSentimentTranscript>): string => {
  const { summary, messages } = data;
  let html = '';
  
  // Format summary
  if (summary) {
    html += `<div class="bg-gray-100 p-4 rounded-xl mb-6">
      <h3 class="text-lg font-bold text-[var(--color-primary)] mb-3">
        <span class="mr-2">📊</span>Phân tích cảm xúc
      </h3>
      <div class="grid grid-cols-4 gap-2 mb-3">
        <div class="bg-white p-3 rounded-lg text-center">
          <div class="text-lg font-semibold">${summary.totalParagraphs}</div>
          <div class="text-sm text-gray-500">Tổng</div>
        </div>
        <div class="bg-green-50 p-3 rounded-lg text-center">
          <div class="text-lg font-semibold text-green-600">${summary.positive} (${summary.positivePercentage}%)</div>
          <div class="text-sm text-gray-500">Tích cực</div>
        </div>
        <div class="bg-gray-50 p-3 rounded-lg text-center">
          <div class="text-lg font-semibold text-gray-600">${summary.neutral} (${summary.neutralPercentage}%)</div>
          <div class="text-sm text-gray-500">Trung lập</div>
        </div>
        <div class="bg-red-50 p-3 rounded-lg text-center">
          <div class="text-lg font-semibold text-red-600">${summary.negative} (${summary.negativePercentage}%)</div>
          <div class="text-sm text-gray-500">Tiêu cực</div>
        </div>
      </div>
    </div>`;
  }
  
  // Format messages
  if (messages.length > 0) {
    let currentSpeaker = '';
    let currentTimestamp = '';
    
    for (const message of messages) {
      // Check if this is a new speaker or timestamp
      const isNewSpeakerOrTime = currentSpeaker !== message.speaker || currentTimestamp !== message.timestamp;
      
      // If new speaker/timestamp, add a header
      if (isNewSpeakerOrTime) {
        // Add some spacing between speaker groups
        if (currentSpeaker) {
          html += `<div class="my-3"></div>`;
        }
        
        html += `<div class="flex justify-between items-center mb-1">
          <div class="font-semibold text-[var(--color-primary)]">${message.speaker}</div>
          <div class="text-sm text-gray-500">${message.timestamp}</div>
        </div>`;
        
        currentSpeaker = message.speaker;
        currentTimestamp = message.timestamp;
      }
      
      // Add message with appropriate sentiment styling
      let sentimentIcon = '⚪';
      let bgColor = 'bg-gray-50';
      let iconColor = 'text-gray-400';
      let borderColor = 'border-gray-200';
      
      switch (message.sentiment) {
        case 'positive':
          sentimentIcon = '🟢';
          bgColor = 'bg-green-50';
          iconColor = 'text-green-500';
          borderColor = 'border-green-200';
          break;
        case 'negative':
          sentimentIcon = '🔴';
          bgColor = 'bg-red-50';
          iconColor = 'text-red-500';
          borderColor = 'border-red-200';
          break;
        default:
          // neutral - keep defaults
      }
      
      html += `<div class="flex gap-2 mb-2">
        <div class="${iconColor} text-xl flex-shrink-0">${sentimentIcon}</div>
        <div class="${bgColor} p-3 rounded-lg flex-grow relative border ${borderColor}">
          <p class="text-gray-800 pr-20">
            <span class="font-medium text-[var(--color-secondary)] hidden sm:inline">${message.speaker}: </span>${message.text}
          </p>
          <div class="absolute bottom-1 right-2 text-xs text-gray-500 bg-white/80 px-1 rounded">
            ${message.sentiment} (${message.sentimentScore}%)
          </div>
        </div>
      </div>`;
    }
  } else {
    // If no messages found, display a message
    html += `<div class="p-4 text-center text-gray-500">
      Không tìm thấy nội dung bản ghi.
    </div>`;
  }
  
  return html;
};

/**
 * Formats a standard transcript for display
 * @param data Processed standard transcript data
 * @returns HTML string representation
 */
export const formatStandardTranscriptForDisplay = (data: ReturnType<typeof processStandardTranscript>): string => {
  const { messages } = data;
  let html = '';
  
  if (messages.length > 0) {
    let currentSpeaker = '';
    let speakerColors: Record<string, string> = {};
    const colorClasses = [
      'bg-blue-50 border-blue-200',
      'bg-green-50 border-green-200',
      'bg-purple-50 border-purple-200',
      'bg-yellow-50 border-yellow-200',
      'bg-pink-50 border-pink-200',
      'bg-indigo-50 border-indigo-200',
      'bg-orange-50 border-orange-200',
    ];
    
    html += `<div class="p-4">
      <div class="flex flex-col space-y-4">`;
    
    for (const message of messages) {
      // Assign a color to each speaker for visual distinction
      if (!speakerColors[message.speaker]) {
        const colorIndex = Object.keys(speakerColors).length % colorClasses.length;
        speakerColors[message.speaker] = colorClasses[colorIndex];
      }
      
      const isNewSpeaker = currentSpeaker !== message.speaker;
      currentSpeaker = message.speaker;
      
      // Add message bubble with appropriate styling
      html += `
        <div class="flex ${isNewSpeaker ? 'mt-4' : 'mt-1'} items-start">
          <div class="w-24 flex-shrink-0">
            <div class="font-medium text-sm ${isNewSpeaker ? 'text-[var(--color-primary)]' : 'text-gray-400'}">${message.speaker}</div>
            <div class="text-xs text-gray-400">${message.timestamp}</div>
          </div>
          <div class="flex-grow ml-2">
            <div class="${speakerColors[message.speaker]} p-3 rounded-lg border">
              ${message.text}
            </div>
          </div>
        </div>`;
    }
    
    html += `</div></div>`;
  } else {
    // If no messages found, display a message
    html += `<div class="p-4 text-center text-gray-500">
      Không tìm thấy nội dung bản ghi.
    </div>`;
  }
  
  return html;
};

/**
 * Main function to format any transcript for display
 * @param transcriptText Raw transcript text
 * @returns HTML string representation
 */
export const formatTranscriptForDisplay = (transcriptText: string): string => {
  const processedData = processTranscript(transcriptText);
  
  if (processedData.type === TranscriptType.SENTIMENT) {
    return formatSentimentTranscriptForDisplay(processedData as ReturnType<typeof processSentimentTranscript>);
  } else {
    return formatStandardTranscriptForDisplay(processedData as ReturnType<typeof processStandardTranscript>);
  }
};

/**
 * Gets data for React components from a transcript
 * @param transcriptText Raw transcript text
 * @returns Structured data for React components
 */
export const getTranscriptData = (transcriptText: string) => {
  return processTranscript(transcriptText);
};
