import { Box, Grid, Stack } from "@/vendors/styled-system/jsx";
import type { Meta, StoryObj } from "@storybook/react";
import Text from "../text/text";
import type { LinkSizes, LinkTones } from "./link";
import Link from "./link";

const meta = {
  title: "Components V2/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    size: "lg",
    tone: "link",
    href: "/storybook",
    children: "Link",
    underline: false,
    hover: "underline",
  },
  argTypes: {
    size: {
      description:
        "Size variant based on text recipe\n\n`lg` (paragraph-1), `md` (paragraph-2), `sm` (caption-1)",
      options: ["sm", "md", "lg"] as LinkSizes[],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "md" },
      },
    },
    tone: {
      description: "Color tone of the link\n\n`link`, `primary`, `inverse`",
      options: ["link", "primary", "inverse"] as LinkTones[],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "link" },
      },
    },
    underline: {
      description: "Whether the link is underlined by default",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hover: {
      description:
        "Hover behavior\n\n`underline` adds underline on hover, `changeColor` changes color on hover, `none` disables hover effect",
      options: ["underline", "changeColor", "none"],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "underline" },
      },
    },
    href: {
      description:
        'The URL the link points to. Automatically prefixes with "/" if needed.',
      control: { type: "text" },
    },
    prefetch: {
      description: "Whether to prefetch the linked page",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    children: {
      description: "Link text content",
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "This component is a wrapper around the [Next.js Link](https://nextjs.org/docs/pages/api-reference/components/link) component, offering a collection of variants and tones. Supports automatic href prefix handling for relative paths.",
      },
    },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground: Story = {
  args: {
    size: "md",
    tone: "link",
    href: "/storybook",
    children: "Link",
  },
};

// ============================================================================
// Sizes
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="sbds-dimension-space-size-m"
    >
      <Stack gap="sbds-dimension-space-size-s">
        <Stack gap="sbds-dimension-space-size-xs">
          <Text variant="paragraph-1" weight="bold">
            lg (large)
          </Text>
          <Text variant="caption-1" tone="secondary">
            paragraph-1, normal weight
          </Text>
        </Stack>
        <Box mt="auto">
          <Link size="lg" href="/storybook">
            Link
          </Link>
        </Box>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Stack gap="sbds-dimension-space-size-xs">
          <Text variant="paragraph-1" weight="bold">
            md (medium)
          </Text>
          <Text variant="caption-1" tone="secondary">
            paragraph-2, normal weight
          </Text>
        </Stack>
        <Box mt="auto">
          <Link size="md" href="/storybook">
            Link
          </Link>
        </Box>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Stack gap="sbds-dimension-space-size-xs">
          <Text variant="paragraph-1" weight="bold">
            sm (small)
          </Text>
          <Text variant="caption-1" tone="secondary">
            caption-1, medium weight
          </Text>
        </Stack>
        <Box mt="auto">
          <Link size="sm" href="/storybook">
            Link
          </Link>
        </Box>
      </Stack>
    </Grid>
  ),
};

// ============================================================================
// Tones
// ============================================================================

export const Tones: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="sbds-dimension-space-size-m"
    >
      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          link (default)
        </Text>
        <Box mt="auto">
          <Link tone="link" href="/storybook">
            Link
          </Link>
        </Box>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          primary
        </Text>
        <Box mt="auto">
          <Link tone="primary" href="/storybook">
            Link
          </Link>
        </Box>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          inverse
        </Text>
        <Box mt="auto" bg="sbds-background-color-dark" p="4" borderRadius="md">
          <Link tone="inverse" href="/storybook">
            Link
          </Link>
        </Box>
      </Stack>
    </Grid>
  ),
};

// ============================================================================
// Underline
// ============================================================================

export const Underline: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="repeat(2, 1fr)"
      gap="sbds-dimension-space-size-m"
    >
      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          underline: false (default)
        </Text>
        <Link underline={false} href="/storybook">
          Link
        </Link>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          underline: true
        </Text>
        <Link underline href="/storybook">
          Link
        </Link>
      </Stack>
    </Grid>
  ),
};

// ============================================================================
// Hover Options
// ============================================================================

export const HoverOptions: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="sbds-dimension-space-size-m"
    >
      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          hover: underline (default)
        </Text>
        <Link hover="underline" href="/storybook">
          Link
        </Link>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          hover: changeColor
        </Text>
        <Link hover="changeColor" href="/storybook">
          Link
        </Link>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          hover: none
        </Text>
        <Link hover="none" href="/storybook">
          Link
        </Link>
      </Stack>
    </Grid>
  ),
};

// ============================================================================
// Custom Styling with Panda CSS Props
// ============================================================================

export const CustomStyling: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="repeat(2, 1fr)"
      gap="sbds-dimension-space-size-m"
    >
      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          Bold font weight
        </Text>
        <Link href="/storybook" fontWeight="bold">
          Link
        </Link>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          Custom color
        </Text>
        <Link href="/storybook" color="sbds-font-color-success">
          Link
        </Link>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          Custom text decoration style
        </Text>
        <Link
          href="/storybook"
          textDecoration="underline"
          textDecorationStyle="dashed"
          textUnderlineOffset="4px"
        >
          Link
        </Link>
      </Stack>

      <Stack gap="sbds-dimension-space-size-s">
        <Text variant="paragraph-1" weight="bold">
          Combined custom styles with hover
        </Text>
        <Link
          href="/storybook"
          fontWeight="semibold"
          color="sbds-font-color-warning"
          textDecoration="underline"
          textDecorationStyle="wavy"
          _hover={{ color: "sbds-font-color-error" }}
        >
          Link
        </Link>
      </Stack>
    </Grid>
  ),
};
