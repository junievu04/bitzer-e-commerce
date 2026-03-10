import { Box, Stack } from "@/vendors/styled-system/jsx";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextArea from "./text-area";

const meta: Meta<typeof TextArea> = {
  title: "Components V2/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    label: "Label",
    placeholder: "Input Text",
  },
  argTypes: {
    name: {
      description: "Name attribute for the textarea field",
      control: { type: "text" },
    },
    label: {
      description: "Label text displayed above the textarea",
      control: { type: "text" },
    },
    placeholder: {
      description: "Placeholder text shown when textarea is empty",
      control: { type: "text" },
    },
    maxLength: {
      description: "Maximum length of the textarea with character counter",
      control: { type: "number" },
    },
    message: {
      description: "Helper or error message displayed below the textarea",
      control: { type: "text" },
    },
    error: {
      description: "Error state - changes border color and message styling",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "Disabled state - prevents interaction",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    rows: {
      description: "Number of visible text rows",
      control: { type: "number" },
    },
    value: {
      description: "Controlled value of the textarea",
      control: { type: "text" },
    },
    defaultValue: {
      description: "Default uncontrolled value of the textarea",
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A text area is a user interface element for multiline text input. It allows users to enter, edit and submit multiple lines of text. It is commonly used in forms, comment sections, and messaging applications.",
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
    label: "Label",
    placeholder: "Input Text",
    id: "text-area-playground",
    rows: 4,
  },
};

// ============================================================================
// Basic States
// ============================================================================

export const States: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Default State
        </Box>
        <TextArea
          id="default"
          label="Label"
          placeholder="Input Text"
          rows={4}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          With Value
        </Box>
        <TextArea
          id="with-value"
          label="Label"
          defaultValue="This is some sample text that demonstrates how the textarea looks with content."
          rows={4}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Error State
        </Box>
        <TextArea
          id="error"
          label="Label"
          placeholder="Input Text"
          error
          message="Error message"
          rows={4}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Disabled State
        </Box>
        <TextArea
          id="disabled"
          label="Label"
          placeholder="Input Text"
          disabled
          rows={4}
        />
      </Box>
    </Stack>
  ),
};

// ============================================================================
// With Messages
// ============================================================================

export const Messages: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Helper Message
        </Box>
        <TextArea
          id="helper"
          label="Label"
          placeholder="Input Text"
          message="Helper message"
          rows={4}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Error Message
        </Box>
        <TextArea
          id="error-message"
          label="Label"
          placeholder="Input Text"
          error
          message="Error message"
          rows={4}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Long Message
        </Box>
        <Box maxW="400px">
          <TextArea
            id="long-message"
            label="Label"
            placeholder="Input Text"
            message="This is a very long message that demonstrates how the TextArea handles lengthy helper text"
            rows={4}
          />
        </Box>
      </Box>
    </Stack>
  ),
};

// ============================================================================
// With Max Length
// ============================================================================

export const MaxLength: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Max Length (100 characters)
        </Box>
        <TextArea
          id="max-length"
          label="Label"
          placeholder="Input Text"
          maxLength={100}
          rows={4}
        />
      </Box>
    </Stack>
  ),
};

// ============================================================================
// Different Sizes (Rows)
// ============================================================================

export const DifferentSizes: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Small (2 rows)
        </Box>
        <TextArea id="small" label="Label" placeholder="Input Text" rows={2} />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Medium (4 rows)
        </Box>
        <TextArea id="medium" label="Label" placeholder="Input Text" rows={4} />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Large (8 rows)
        </Box>
        <TextArea id="large" label="Label" placeholder="Input Text" rows={8} />
      </Box>
    </Stack>
  ),
};

// ============================================================================
// Without Label
// ============================================================================

export const WithoutLabel: Story = {
  render: () => (
    <Stack gap="sbds-dimension-space-size-xl">
      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          Basic (No Label)
        </Box>
        <TextArea id="no-label-basic" placeholder="Input Text" rows={4} />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          With Message (No Label)
        </Box>
        <TextArea
          id="no-label-message"
          placeholder="Input Text"
          message="Helper message"
          rows={4}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          With Error (No Label)
        </Box>
        <TextArea
          id="no-label-error"
          placeholder="Input Text"
          error
          message="Error message"
          rows={4}
        />
      </Box>

      <Box>
        <Box
          fontSize="sbds-global-font-size-6"
          fontWeight="bold"
          mb="sbds-dimension-space-size-s"
        >
          With Max Length (No Label)
        </Box>
        <TextArea
          id="no-label-maxlength"
          placeholder="Input Text"
          maxLength={100}
          rows={4}
        />
      </Box>
    </Stack>
  ),
};
