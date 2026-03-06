import { Box, Flex } from "@/vendors/styled-system/jsx";
import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta = {
  title: "Components V2/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          "A spinner component with MUI-like animation. Extends BoxProps for flexible styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "link",
        "link-disabled",
        "disabled",
        "warning",
        "placeholder",
        "inactive",
        "error",
        "inverse",
        "trending",
        "inherit",
      ],
      description: "Tone variant of the spinner",
    },
    thickness: {
      control: { type: "number" },
      description: "Thickness of the spinner stroke",
    },
    w: {
      control: { type: "number" },
      description: "Width of the spinner (from BoxProps)",
    },
    h: {
      control: { type: "number" },
      description: "Height of the spinner (from BoxProps)",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <Flex align="center" gap="6">
      <Box textAlign="center">
        <Spinner w={16} h={16} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          16px
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner w={24} h={24} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          24px
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner w={40} h={40} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          40px (default)
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner w={48} h={48} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          48px
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner w={64} h={64} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          64px
        </Box>
      </Box>
    </Flex>
  ),
};

export const Tones: Story = {
  render: () => (
    <Flex align="center" gap="6" flexWrap="wrap">
      <Box textAlign="center">
        <Spinner tone="default" />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          default
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner tone="primary" />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          primary
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner tone="secondary" />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          secondary
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner tone="success" />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          success
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner tone="link" />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          link
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner tone="warning" />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          warning
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner tone="error" />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          error
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner tone="trending" />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          trending
        </Box>
      </Box>
      <Box textAlign="center" p="4" bg="sbds-background-color-inverse">
        <Spinner tone="inverse" />
        <Box mt="2" fontSize="sm" color="sbds-font-color-inverse">
          inverse
        </Box>
      </Box>
    </Flex>
  ),
};

export const Thickness: Story = {
  render: () => (
    <Flex align="center" gap="6">
      <Box textAlign="center">
        <Spinner thickness={1} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          1
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner thickness={2} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          2
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner thickness={3.6} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          3.6 (default)
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner thickness={5} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          5
        </Box>
      </Box>
      <Box textAlign="center">
        <Spinner thickness={8} />
        <Box mt="2" fontSize="sm" color="sbds-font-color-secondary">
          8
        </Box>
      </Box>
    </Flex>
  ),
};

export const InheritTone: Story = {
  render: () => (
    <Flex align="center" gap="6">
      <Box color="sbds-status-color-success">
        <Spinner tone="inherit" />
        <Box mt="2" fontSize="sm">
          Inherits success color
        </Box>
      </Box>
      <Box color="sbds-status-color-warning">
        <Spinner tone="inherit" />
        <Box mt="2" fontSize="sm">
          Inherits warning color
        </Box>
      </Box>
      <Box color="sbds-status-color-info">
        <Spinner tone="inherit" />
        <Box mt="2" fontSize="sm">
          Inherits info color
        </Box>
      </Box>
    </Flex>
  ),
};

export const InButton: Story = {
  render: () => (
    <Flex gap="4">
      <Flex
        alignItems="center"
        justifyContent="center"
        gap="2"
        px="4"
        py="2"
        bg="sbds-interaction-color-default"
        color="sbds-font-color-inverse"
        borderRadius="sbds-dimension-border-radius-full"
        cursor="pointer"
      >
        <Spinner w={16} h={16} tone="inverse" />
        Loading...
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        gap="2"
        px="4"
        py="2"
        bg="transparent"
        color="sbds-font-color-primary"
        border="1px solid"
        borderColor="sbds-interaction-color-default"
        borderRadius="sbds-dimension-border-radius-full"
        cursor="pointer"
      >
        <Spinner w={16} h={16} tone="default" />
        Loading...
      </Flex>
    </Flex>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Flex direction="column" gap="8">
      <Box>
        <Box mb="4" fontWeight="bold">
          Sizes (using w/h props)
        </Box>
        <Flex align="center" gap="4">
          <Spinner w={16} h={16} />
          <Spinner w={24} h={24} />
          <Spinner w={40} h={40} />
          <Spinner w={48} h={48} />
        </Flex>
      </Box>

      <Box>
        <Box mb="4" fontWeight="bold">
          Tones
        </Box>
        <Flex align="center" gap="4" flexWrap="wrap">
          <Spinner tone="default" w={24} h={24} />
          <Spinner tone="primary" w={24} h={24} />
          <Spinner tone="secondary" w={24} h={24} />
          <Spinner tone="success" w={24} h={24} />
          <Spinner tone="link" w={24} h={24} />
          <Spinner tone="warning" w={24} h={24} />
          <Spinner tone="error" w={24} h={24} />
          <Spinner tone="trending" w={24} h={24} />
          <Box p="2" bg="sbds-background-color-inverse" borderRadius="md">
            <Spinner tone="inverse" w={24} h={24} />
          </Box>
        </Flex>
      </Box>

      <Box>
        <Box mb="4" fontWeight="bold">
          Thickness
        </Box>
        <Flex align="center" gap="4">
          <Spinner thickness={1} />
          <Spinner thickness={2} />
          <Spinner thickness={3.6} />
          <Spinner thickness={5} />
          <Spinner thickness={8} />
        </Flex>
      </Box>
    </Flex>
  ),
};
