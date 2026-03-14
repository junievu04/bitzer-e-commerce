import withErrorBoundary from "@/utils/withErrorBoundary";
import { notFound } from "next/navigation";
import LayoutComponentRenderer from "./layout-component-renderer";
import LayoutContentWrapper from "./layout-content-wrapper";
import fetchLayoutData from "./utils/fetch-layout-data";

interface Props {
  layoutKey: string;
}

const PageLayout = async ({ layoutKey }: Props) => {
  const data = await fetchLayoutData(layoutKey);

  if (!data) return notFound();

  return (
    <LayoutContentWrapper>
      {data.components.map((component, index) => (
        <LayoutComponentRenderer
          key={`${component.tag}-${index}`}
          component={component}
        />
      ))}
    </LayoutContentWrapper>
  );
};

export default withErrorBoundary(PageLayout);
