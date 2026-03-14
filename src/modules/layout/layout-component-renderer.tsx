import type { LayoutComponent } from "@/types/api";
import layoutComponents from "./layout-components";

interface Props {
  component: LayoutComponent;
}

export default function LayoutComponentRenderer({ component }: Props) {
  const { type, detail } = component;

  const Component = layoutComponents[type];

  if (!Component) {
    // Dev warning, không crash production
    if (process.env.NODE_ENV === "development") {
      console.warn(`[LayoutRenderer] Unregistered component type: "${type}"`);
    }
    return null;
  }

  return <Component detail={detail} />;
}
