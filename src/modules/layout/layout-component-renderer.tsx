import type { LayoutComponent } from "@/types/api";
import layoutComponents from "./layout-components";

interface Props {
  component: LayoutComponent;
}

export default function LayoutComponentRenderer({ component }: Props) {
  const { tag, detail } = component;

  const Component = layoutComponents[tag];

  if (!Component) {
    // Dev warning, không crash production
    if (process.env.NODE_ENV === "development") {
      console.warn(`[LayoutRenderer] Unregistered component type: "${tag}"`);
    }
    return null;
  }

  return <Component detail={detail} />;
}
