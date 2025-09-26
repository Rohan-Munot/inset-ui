export const initialTaskList = {
  id: "q4-initiatives-2025",
  title: "Q4 Strategic Initiatives 2025",
  summary:
    "Key projects focusing on AI enhancements, platform efficiency, and new market compliance.",
  tasks: [
    {
      id: "task-1",
      title: "Get a Job",
      description:
        "I am a frontend developer and I like designs, and crafting beautiful interaction. Learning and growing everyday.",
      stage: "In progress",
      due: "Due ?",
      pinned: true,
      owner: {
        name: "Rohan",
        initials: "R",
        role: "Frontend Developer",
      },
    },
    {
      id: "task-2",
      title: "Implement India's DPDPA consent banner",
      description:
        "Legal has finalized the requirements for the Digital Personal Data Protection Act. Build the new geo-targeted consent banner and ensure logging is compliant before the deadline.",
      stage: "Ready",
      due: "Due next Monday",
      pinned: false,
      owner: {
        name: "Karan Mehta",
        initials: "KM",
        role: "Frontend Dev",
      },
    },
    {
      id: "task-3",
      title: "Prototype AR view for product showcase",
      description:
        "Build a proof-of-concept for the upcoming product line using the latest ARKit. Test performance on current-gen phones and the Vision Pro 2 simulator.",
      stage: "In progress",
      due: "Demo on Friday",
      pinned: true,
      owner: {
        name: "Priya Singh",
        initials: "PS",
        role: "iOS Developer",
      },
    },
    {
      id: "task-4",
      title: "Evaluate cost-effective cloud monitoring tools",
      description:
        "Our Datadog bill has exceeded the quarterly budget. Research at least two viable alternatives, compare feature sets, and present a cost-benefit analysis.",
      stage: "Review",
      due: "Present tomorrow",
      pinned: false,
      owner: {
        name: "Arjun Reddy",
        initials: "AR",
        role: "DevOps",
      },
    },
    {
      id: "task-5",
      title: "Integrate carbon footprint estimation at checkout",
      description:
        "Work with our logistics partner's API to pull carbon data for shipping options. This is a key ESG goal for the quarter. Blocked until UX provides final wireframes.",
      stage: "Backlog",
      due: "Pending UX",
      pinned: false,
    },
    {
      id: "task-6",
      title: "User research on hybrid team friction",
      description:
        "Interview members of the distributed team to identify pain points with our current async communication stack. Synthesize findings and propose tool/process improvements.",
      stage: "In progress",
      due: "Report due next week",
      pinned: false,
      owner: {
        name: "Zoya Ali",
        initials: "ZA",
        role: "UX Research",
      },
    },
    {
      id: "task-7",
      title: "Technical proposal for ONDC integration",
      description:
        "Outline the architecture and engineering effort required to list our catalogue on India's Open Network for Digital Commerce (ONDC). Identify potential integration partners.",
      stage: "Backlog",
      due: "Needs grooming",
      pinned: true,
      owner: {
        name: "Aisha Khan",
        initials: "AK",
        role: "Product Manager",
      },
    },
    {
      id: "task-8",
      title: "Address user feedback on 'soulless' AI content",
      description:
        "Users are reporting that our AI-generated summaries feel generic. Analyze sentiment from feedback channels and propose a new strategy that blends AI with human oversight.",
      stage: "Ready",
      due: "ETA Friday",
      pinned: false,
    },
  ],
};
