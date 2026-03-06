import { Box, Grid, Stack } from "@/vendors/styled-system/jsx";
import type { Meta, StoryObj } from "@storybook/react";
import type {
  TextAlignments,
  TextDecorations,
  TextTags,
  TextTones,
  TextVariants,
  TextWeights,
} from "./text";
import Text from "./text";

const meta: Meta<typeof Text> = {
  title: "Components V2/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    variant: "paragraph-2",
    weight: "normal",
    tone: "primary",
    align: "left",
    children: "The quick brown fox jumps over the lazy dog",
  },
  argTypes: {
    variant: {
      description:
        "Typography variant\n\n`metric-1`, `metric-2`, `metric-3`, `page-heading-1`, `page-heading-2`, `section-heading-1`, `section-heading-2`, `paragraph-1`, `paragraph-2`, `caption-1`, `caption-2`",
      options: [
        "metric-1",
        "metric-2",
        "metric-3",
        "page-heading-1",
        "page-heading-2",
        "section-heading-1",
        "section-heading-2",
        "paragraph-1",
        "paragraph-2",
        "caption-1",
        "caption-2",
      ] as TextVariants[],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "paragraph-2" },
      },
    },
    htmlTag: {
      description:
        "Override the default HTML tag\n\n`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `span`, `div`, `label`",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "div",
        "label",
      ] as TextTags[],
      control: { type: "select" },
    },
    weight: {
      description: "Font weight\n\n`light`, `normal`, `medium`, `bold`",
      options: ["light", "normal", "medium", "bold"] as TextWeights[],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "normal" },
      },
    },
    tone: {
      description:
        "Text color tone\n\n`primary`, `inverse`, `secondary`, `placeholder`, `inactive`, `disabled`, `link`, `link-disabled`, `success`, `warning`, `error`, `trending`",
      options: [
        "primary",
        "inverse",
        "secondary",
        "placeholder",
        "inactive",
        "disabled",
        "link",
        "link-disabled",
        "success",
        "warning",
        "error",
        "trending",
      ] as TextTones[],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    align: {
      description: "Text alignment\n\n`left`, `center`, `right`, `justify`",
      options: ["left", "center", "right", "justify"] as TextAlignments[],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "left" },
      },
    },
    decoration: {
      description: "Text decoration\n\n`overline`, `underline`, `line-through`",
      options: ["overline", "underline", "line-through"] as TextDecorations[],
      control: { type: "select" },
    },
    truncate: {
      description: "Truncate text to N lines\n\n`1`, `2`, `3`, `4`",
      options: [1, 2, 3, 4],
      control: { type: "select" },
    },
    inline: {
      description: "Display as inline element",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    children: {
      description: "Text content",
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Text component provides consistent typography across the application. It supports various variants (metrics, headings, paragraphs, captions), weights, tones, and text treatments like truncation and decoration. Each variant has responsive font sizes and line heights defined in the design system.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground: Story = {
  args: {
    variant: "paragraph-2",
    weight: "normal",
    tone: "primary",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

// ============================================================================
// Variant Showcase
// ============================================================================

export const AllVariants: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-l">
      <Text variant="metric-1">Metric 1</Text>
      <Text variant="metric-2">Metric 2</Text>
      <Text variant="metric-3">Metric 3</Text>
      <Text variant="page-heading-1">Page Heading 1</Text>
      <Text variant="page-heading-2">Page Heading 2</Text>
      <Text variant="section-heading-1">Section Heading 1</Text>
      <Text variant="section-heading-2">Section Heading 2</Text>
      <Text variant="paragraph-1">Paragraph 1</Text>
      <Text variant="paragraph-2">Paragraph 2</Text>
      <Text variant="caption-1">Caption 1</Text>
      <Text variant="caption-2">Caption 2</Text>
    </Stack>
  ),
};

// ============================================================================
// Weight Variations
// ============================================================================

export const Weights: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-m">
      <Text variant="paragraph-1" weight="light">
        Light weight text
      </Text>
      <Text variant="paragraph-1" weight="normal">
        Normal weight text
      </Text>
      <Text variant="paragraph-1" weight="medium">
        Medium weight text
      </Text>
      <Text variant="paragraph-1" weight="bold">
        Bold weight text
      </Text>
    </Stack>
  ),
};

// ============================================================================
// Tone Variations
// ============================================================================

export const Tones: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="repeat(2, 1fr)"
      gap="sbds-dimension-space-size-m"
    >
      <Text tone="primary">Primary text tone</Text>
      <Text tone="secondary">Secondary text tone</Text>
      <Text tone="placeholder">Placeholder text tone</Text>
      <Text tone="inactive">Inactive text tone</Text>
      <Text tone="disabled">Disabled text tone</Text>
      <Text tone="link">Link text tone</Text>
      <Text tone="link-disabled">Link disabled text tone</Text>
      <Text tone="success">Success text tone</Text>
      <Text tone="warning">Warning text tone</Text>
      <Text tone="error">Error text tone</Text>
      <Text tone="trending">Trending text tone</Text>
      <Box bg="sbds-background-color-dark" p="sbds-dimension-space-size-s">
        <Text tone="inverse">Inverse text tone</Text>
      </Box>
    </Grid>
  ),
};

// ============================================================================
// Truncation
// ============================================================================

export const Truncation: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="repeat(2, 1fr)"
      gap="sbds-dimension-space-size-l"
    >
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Single Line Truncate
        </Box>
        <Box maxW="300px">
          <Text truncate={1}>
            This is a very long text that should be truncated to a single line
            with an ellipsis at the end when it exceeds the container width
          </Text>
        </Box>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Two Line Truncate
        </Box>
        <Box maxW="300px">
          <Text truncate={2}>
            This is a very long text that should be truncated to two lines with
            an ellipsis at the end when it exceeds the container constraints.
            This demonstrates multi-line truncation.
          </Text>
        </Box>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Three Line Truncate
        </Box>
        <Box maxW="300px">
          <Text truncate={3}>
            This is a very long text that should be truncated to three lines
            with an ellipsis at the end when it exceeds the container
            constraints. This demonstrates multi-line truncation with more
            content visible before the cutoff point.
          </Text>
        </Box>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Four Line Truncate
        </Box>
        <Box maxW="300px">
          <Text truncate={4}>
            This is a very long text that should be truncated to four lines with
            an ellipsis at the end when it exceeds the container constraints.
            This demonstrates multi-line truncation with even more content
            visible before the cutoff point. You can see how the text wraps
            naturally until it reaches the maximum number of lines.
          </Text>
        </Box>
      </Box>
    </Grid>
  ),
};

// ============================================================================
// Alignment
// ============================================================================

export const Alignment: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-m">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Left Aligned (Default)
        </Box>
        <Box>
          <Text align="left">
            This text is aligned to the left side of its container
          </Text>
        </Box>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Center Aligned
        </Box>
        <Box>
          <Text align="center">
            This text is aligned to the center of its container
          </Text>
        </Box>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Right Aligned
        </Box>
        <Box>
          <Text align="right">
            This text is aligned to the right side of its container
          </Text>
        </Box>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Justified
        </Box>
        <Box>
          <Text align="justify">
            This text is justified, which means it stretches to fill the entire
            width of its container by adjusting the spacing between words. This
            creates clean edges on both left and right sides.
          </Text>
        </Box>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// Decoration
// ============================================================================

export const Decorations: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-m">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Underline
        </Box>
        <Text decoration="underline">This text has an underline</Text>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Overline
        </Box>
        <Text decoration="overline">This text has an overline</Text>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Line Through (Strikethrough)
        </Box>
        <Text decoration="line-through">This text has a line through it</Text>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// Inline Display
// ============================================================================

export const InlineDisplay: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-l">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Block Display (Default)
        </Box>
        <Box>
          <Text>First block text</Text>
          <Text>Second block text</Text>
          <Text>Third block text</Text>
        </Box>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Inline Display
        </Box>
        <Box>
          <Text inline>First inline text</Text>{" "}
          <Text inline tone="success">
            Second inline text
          </Text>{" "}
          <Text inline tone="error">
            Third inline text
          </Text>
        </Box>
      </Box>
    </Stack>
  ),
};
