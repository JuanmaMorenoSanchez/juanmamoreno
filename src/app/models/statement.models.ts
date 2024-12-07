export interface Statement {
    introduction: {
      image: {
        src: string;
        alt: string;
      };
      content: string;
    };
    sections: Section[];
}

export interface Section {
    title: string;
    content?: string[]; // For paragraphs of text in the section
    items?: Item[]; // For subsections with subtitles and content
}

export interface Item {
    subtitle: string;
    content: string; // HTML or plain text content for the subsection
}