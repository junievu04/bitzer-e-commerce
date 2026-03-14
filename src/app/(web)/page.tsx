import fetchHomeLayout from "@/modules/home/utils/fetch-home-layout-data";
import LayoutComponentRenderer from "@/modules/layout/layout-component-renderer";
import LayoutContentWrapper from "@/modules/layout/layout-content-wrapper";
import withErrorBoundary from "@/utils/withErrorBoundary";
import { notFound } from "next/navigation";

const page = async () => {
  const data = await fetchHomeLayout();
  if (!data) {
    return notFound();
  }
  return (
    <LayoutContentWrapper>
      {data.components.map((component, index) => (
        <LayoutComponentRenderer
          key={`${component.type}-${index}`}
          component={component}
        />
      ))}
    </LayoutContentWrapper>
  );
};

export default withErrorBoundary(page);
