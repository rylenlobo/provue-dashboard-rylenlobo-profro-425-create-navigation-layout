import { routes } from "@/lib/routes";

export const navigationItems = [
  {
    label: "Dashboard",
    to: routes.DASHBOARD,
    defaultIcon: "assets/svg/navigation/default-icons/dashboard.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-dashboard.svg",
  },
  {
    label: "Actions",
    to: routes.ACTIONS,
    defaultIcon: "assets/svg/navigation/default-icons/actions.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-actions.svg",
  },
  {
    label: "Prompts",
    to: routes.PROMPTS,
    defaultIcon: "assets/svg/navigation/default-icons/prompts.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-prompts.svg",
  },
  {
    label: "Instructions",
    to: routes.INSTRUCTIONS,
    defaultIcon: "assets/svg/navigation/default-icons/instructions.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-instructions.svg",
  },
  {
    label: "Knowledge",
    to: routes.KNOWLEDGE,
    defaultIcon: "assets/svg/navigation/default-icons/knowledge.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-knowledge.svg",
  },
  {
    label: "Servers & Tools",
    to: routes.SERVERS,
    defaultIcon: "assets/svg/navigation/default-icons/servers.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-servers.svg",
  },
  {
    label: "Models",
    to: routes.MODELS,
    defaultIcon: "assets/svg/navigation/default-icons/models.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-models.svg",
  },
  {
    label: "Users",
    to: routes.USERS,
    defaultIcon: "assets/svg/navigation/default-icons/users.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-users.svg",
  },
  {
    label: "Influencers",
    to: routes.INFLUENCERS,
    defaultIcon: "assets/svg/navigation/default-icons/influencer.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-influencer.svg",
  },

  {
    label: "Base Agent",
    to: routes.BASE_AGENTS,
    defaultIcon: "assets/svg/navigation/default-icons/base-agent.svg",
    filledIcon: "assets/svg/navigation/filled-icons/filled-base-agent.svg",
  },
];
