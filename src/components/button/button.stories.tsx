import ArrowLeft from "@/components/icons/arrow-left";
import ArrowRight from "@/components/icons/arrow-right";
import MagnifyingGlass from "@/components/icons/magnifying-glass";
import { Box, Grid, Stack } from "@/vendors/styled-system/jsx";
import type { Meta, StoryObj } from "@storybook/react";
import type { ButtonSizes, ButtonVariants } from "./button";
import Button from "./button";

const meta = {
  title: "Components V2/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    variant: "default",
    size: "md",
    children: "Button",
    disabled: false,
    isLoading: false,
    fullWidth: false,
    onDark: false,
  },
  argTypes: {
    variant: {
      description:
        "Visual style variant\n\n`default`, `secondary`, `highlight`, `highlight-secondary`, `highlight-plain`, `plain`, `destructive`",
      options: [
        "default",
        "secondary",
        "highlight",
        "highlight-secondary",
        "highlight-plain",
        "plain",
        "destructive",
        "none",
      ] as ButtonVariants[],
      control: { type: "select" },
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      description: "Size of the button\n\n`sm`, `md`, `lg`",
      options: ["sm", "md", "lg"] as ButtonSizes[],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      description: "Disable the button",
      control: { type: "boolean" },
    },
    isLoading: {
      description: "Show loading state",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    loadingText: {
      description: "Optional text to show during loading state",
      control: { type: "text" },
    },
    fullWidth: {
      description: "Make button take full width of container",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onDark: {
      description:
        "Use on dark backgrounds. Affects colors for `default`, `secondary`, `highlight-plain`, `plain` variants.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    children: {
      description: "Button text content",
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Buttons allow users to take actions and make choices with a single tap or click. They are used to trigger events such as submitting a form, opening a dialog, or navigating to a new page. Buttons should be clear, consistent, and prioritize primary actions.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Interactive Playground
// ============================================================================

export const Playground: Story = {
  args: {
    variant: "default",
    size: "md",
    children: "Button",
  },
};

// ============================================================================
// Size & State Matrix
// ============================================================================

export const SizeAndStateMatrix: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="sbds-dimension-space-size-m"
    >
      <Stack gap="sbds-dimension-space-size-s">
        <Button variant={args.variant} size="sm">
          Button
        </Button>
        <Button variant={args.variant} size="md">
          Button
        </Button>
        <Button variant={args.variant} size="lg">
          Button
        </Button>
      </Stack>
      <Stack gap="sbds-dimension-space-size-s">
        <Button variant={args.variant} size="sm" isLoading>
          Loading
        </Button>
        <Button variant={args.variant} size="md" isLoading>
          Loading
        </Button>
        <Button variant={args.variant} size="lg" isLoading>
          Loading
        </Button>
      </Stack>
      <Stack gap="sbds-dimension-space-size-s">
        <Button variant={args.variant} size="sm" disabled>
          Button
        </Button>
        <Button variant={args.variant} size="md" disabled>
          Button
        </Button>
        <Button variant={args.variant} size="lg" disabled>
          Button
        </Button>
      </Stack>
    </Grid>
  ),
};

// ============================================================================
// Additional Features
// ============================================================================

export const WithIcons: Story = {
  args: {
    variant: "default",
    size: "md",
  },
  render: (args) => (
    <Grid
      gridTemplateColumns="repeat(4, 1fr)"
      gap="sbds-dimension-space-size-m"
    >
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-m"
        >
          Left Icon
        </Box>
        <Button variant={args.variant} size={args.size} leftIcon={ArrowLeft}>
          Button
        </Button>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-m"
        >
          Right Icon
        </Box>
        <Button variant={args.variant} size={args.size} rightIcon={ArrowRight}>
          Button
        </Button>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-m"
        >
          Both
        </Box>
        <Button
          variant={args.variant}
          size={args.size}
          leftIcon={ArrowLeft}
          rightIcon={ArrowRight}
        >
          Button
        </Button>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-m"
        >
          Icon Only
        </Box>
        <Button
          variant={args.variant}
          size={args.size}
          iconOnly={MagnifyingGlass}
        />
      </Box>
    </Grid>
  ),
};

export const FullWidth: Story = {
  args: {
    variant: "default",
    size: "md",
  },
  render: (args) => (
    <Stack gap="sbds-dimension-space-size-l">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-m"
        >
          Auto Width
        </Box>
        <Stack gap="sbds-dimension-space-size-s" align="flex-start">
          <Button variant={args.variant} size={args.size}>
            Button
          </Button>
          <Button variant={args.variant} size={args.size} isLoading>
            Loading
          </Button>
          <Button variant={args.variant} size={args.size} disabled>
            Button
          </Button>
        </Stack>
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-m"
        >
          Full Width
        </Box>
        <Stack gap="sbds-dimension-space-size-s">
          <Button variant={args.variant} size={args.size} fullWidth>
            Button
          </Button>
          <Button variant={args.variant} size={args.size} fullWidth isLoading>
            Loading
          </Button>
          <Button variant={args.variant} size={args.size} fullWidth disabled>
            Button
          </Button>
        </Stack>
      </Box>
    </Stack>
  ),
};
