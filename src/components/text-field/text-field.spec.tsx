import {render, screen, fireEvent} from '@testing-library/react'
import TextField from './text-field'
import {MagnifyingGlass, Eye} from '../icons'

describe('TextField Component Tests', () => {
  it('renders correctly with label and placeholder', () => {
    render(<TextField label='Email' placeholder='Enter email' />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(<TextField placeholder='Search' />)
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('renders with default value', () => {
    render(<TextField label='Name' defaultValue='John Doe' />)
    const input = screen.getByDisplayValue('John Doe')
    expect(input).toBeInTheDocument()
  })

  describe('ID and Name Attributes', () => {
    it('uses name for input id and name when provided', () => {
      render(<TextField name='email-field' label='Email' />)
      const input = screen.getByLabelText('Email')
      expect(input).toHaveAttribute('id', 'email-field')
      expect(input).toHaveAttribute('name', 'email-field')
    })

    it('uses id for input id and name when name is not provided', () => {
      render(<TextField id='username' label='Username' />)
      const input = screen.getByLabelText('Username')
      expect(input).toHaveAttribute('id', 'username')
      expect(input).toHaveAttribute('name', 'username')
    })

    it('prioritizes name over id when both are provided', () => {
      render(<TextField name='primary' id='secondary' label='Field' />)
      const input = screen.getByLabelText('Field')
      expect(input).toHaveAttribute('id', 'primary')
      expect(input).toHaveAttribute('name', 'primary')
    })
  })

  describe('Error State', () => {
    it('renders error message when error is true', () => {
      render(
        <TextField
          label='Password'
          placeholder='Enter password'
          error
          message='Password is required'
        />,
      )
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })

    it('renders helper message when error is false', () => {
      render(<TextField label='Field' message='Helper text' />)
      expect(screen.getByText('Helper text')).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('disables input when disabled is true', () => {
      render(<TextField id='field' label='Field' disabled />)
      const input = screen.getByLabelText('Field')
      expect(input).toBeDisabled()
    })
  })

  describe('Adornments (Icons)', () => {
    it('renders with left and right adornments', () => {
      render(
        <TextField
          id='search'
          label='Search'
          placeholder='Search'
          leftAdornment={MagnifyingGlass}
          rightAdornment={Eye}
        />,
      )
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    })
  })

  describe('Prefix and Suffix', () => {
    it('renders prefix and suffix text', () => {
      render(
        <TextField label='Amount' placeholder='0.00' prefix='$' suffix='USD' />,
      )
      expect(screen.getByText('$')).toBeInTheDocument()
      expect(screen.getByText('USD')).toBeInTheDocument()
    })
  })

  describe('Focus and Blur Events', () => {
    it('calls onFocus when input is focused', () => {
      const handleFocus = jest.fn()

      render(<TextField id='field' label='Field' onFocus={handleFocus} />)
      const input = screen.getByLabelText('Field')

      fireEvent.focus(input)

      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('calls onBlur when input loses focus', () => {
      const handleBlur = jest.fn()

      render(<TextField id='field' label='Field' onBlur={handleBlur} />)
      const input = screen.getByLabelText('Field')

      fireEvent.focus(input)
      fireEvent.blur(input)

      expect(handleBlur).toHaveBeenCalledTimes(1)
    })
  })

  describe('Input Types', () => {
    it('renders different input types correctly', () => {
      const {rerender} = render(
        <TextField id='password' label='Password' type='password' />,
      )
      expect(screen.getByLabelText('Password')).toHaveAttribute(
        'type',
        'password',
      )

      rerender(<TextField id='email' label='Email' type='email' />)
      expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')

      rerender(<TextField id='age' label='Age' type='number' />)
      expect(screen.getByLabelText('Age')).toHaveAttribute('type', 'number')
    })
  })

  describe('Additional Props', () => {
    it('passes through HTML attributes correctly', () => {
      render(
        <TextField
          label='Field'
          data-testid='custom-field'
          aria-describedby='helper-text'
          autoComplete='off'
          required
          maxLength={10}
        />,
      )
      const input = screen.getByTestId('custom-field')
      expect(input).toHaveAttribute('aria-describedby', 'helper-text')
      expect(input).toHaveAttribute('autocomplete', 'off')
      expect(input).toBeRequired()
      expect(input).toHaveAttribute('maxlength', '10')
    })
  })

  describe('User Interaction', () => {
    it('handles user input and onChange event', () => {
      const handleChange = jest.fn()

      render(<TextField id='name' label='Name' onChange={handleChange} />)
      const input = screen.getByLabelText('Name') as HTMLInputElement

      fireEvent.change(input, {target: {value: 'John Doe'}})

      expect(input).toHaveValue('John Doe')
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('Message Rendering', () => {
    it('renders message when provided', () => {
      render(<TextField label='Field' message='Helpful information' />)
      expect(screen.getByText('Helpful information')).toBeInTheDocument()
    })

    it('does not render message text when message prop is not provided', () => {
      render(<TextField label='Field' placeholder='No message here' />)
      expect(screen.queryByText(/helpful/i)).not.toBeInTheDocument()
    })
  })
})
