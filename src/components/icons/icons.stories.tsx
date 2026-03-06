import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Meta, StoryObj} from '@storybook/react'
import BaseIcon from './base'

const meta: Meta<typeof BaseIcon> = {
  title: 'Components V2/Icons',
  component: BaseIcon,
  parameters: {
    docs: {
      description: {
        component:
          'V2 Icon library with 230+ icons. Click any icon to copy import code.',
      },
    },
  },
  argTypes: {
    size: {
      control: {type: 'select'},
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Icon size',
    },
    tone: {
      control: {type: 'select'},
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'link',
        'link-disabled',
        'disabled',
        'warning',
        'placeholder',
        'inactive',
        'error',
        'inverse',
        'trending',
      ],
      description: 'Icon tone (color)',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof BaseIcon>

const IconPopover = ({
  iconName,
  position,
  onClose,
}: {
  iconName: string
  position: {x: number; y: number}
  onClose: () => void
}) => {
  const [copied, setCopied] = useState(false)

  const namedImport = `import {${iconName}} from '@/components/v2/icons'`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(namedImport)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Close popover when scrolling in Storybook Docs
  React.useEffect(() => {
    const handleScroll = () => {
      onClose()
    }
    // Listen to all scroll events including in Storybook iframe
    document.addEventListener('scroll', handleScroll, true)
    return () => document.removeEventListener('scroll', handleScroll, true)
  }, [onClose])

  const popoverContent = (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
        marginTop: '-12px',
        background: 'white',
        border: '2px solid #007bff',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        padding: '16px',
        zIndex: 9999,
        minWidth: '320px',
        maxWidth: '400px',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          right: '8px',
          top: '8px',
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '0',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
        }}
      >
        ×
      </button>

      <div
        style={{
          fontWeight: 600,
          fontSize: '14px',
          marginBottom: '12px',
          paddingRight: '24px',
          color: '#333',
        }}
      >
        {iconName}
      </div>

      <div
        style={{
          background: '#f8f9fa',
          padding: '10px 12px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '12px',
          wordBreak: 'break-all',
          color: '#333',
          marginBottom: '10px',
          lineHeight: '1.4',
        }}
      >
        {namedImport}
      </div>

      <button
        onClick={copyToClipboard}
        style={{
          width: '100%',
          padding: '8px 12px',
          background: copied ? '#28a745' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.2s',
        }}
      >
        {copied ? '✓ Copied!' : 'Copy Import'}
      </button>

      <div
        style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid #007bff',
        }}
      />
    </div>
  )

  // Render popover via portal to document.body to ensure it scrolls correctly
  return typeof document !== 'undefined'
    ? ReactDOM.createPortal(popoverContent, document.body)
    : null
}

const IconGridComponent = ({
  size = 'md',
  tone = 'primary',
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  tone?: string
}) => {
  const [search, setSearch] = useState('')
  const [selectedIcon, setSelectedIcon] = useState<{
    name: string
    position: {x: number; y: number}
  } | null>(null)

  // Dynamic import of icons - will be populated after running svg:convert
  let icons: Record<
    string,
    React.ComponentType<{size?: string; tone?: string}>
  > = {}
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    icons = require('./index')
  } catch (e) {
    // Index file not yet generated
  }

  const iconEntries = Object.entries(icons)
  const filteredIcons = iconEntries.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase()),
  )

  const handleIconClick = (iconName: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top

    setSelectedIcon({
      name: iconName,
      position: {x, y},
    })
  }

  return (
    <>
      {selectedIcon && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
          }}
          onClick={() => setSelectedIcon(null)}
        />
      )}

      <div style={{padding: '0', maxWidth: '100%', overflow: 'hidden'}}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: 'white',
            padding: '16px',
            marginBottom: '16px',
            borderBottom: '2px solid #eee',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2
                style={{margin: '0 0 4px 0', fontSize: '24px', fontWeight: 600}}
              >
                Icon Library
              </h2>
              <p style={{margin: 0, fontSize: '12px', color: '#666'}}>
                💡 Click any icon to copy import • Use Controls tab to change
                size/tone
              </p>
            </div>
            <div
              style={{
                padding: '8px 16px',
                background: '#e7f3ff',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#007bff',
                border: '1px solid #cce5ff',
              }}
            >
              {filteredIcons.length} icons
            </div>
          </div>

          <input
            type='text'
            placeholder="Search icons... (e.g., 'arrow', 'heart', 'cart')"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '12px',
            padding: '0 16px 40px 16px',
            maxWidth: '100%',
          }}
        >
          {filteredIcons.map(([iconName, IconComponent]) => (
            <div
              key={iconName}
              onClick={(e) => handleIconClick(iconName, e)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '16px 12px',
                border: '2px solid #eee',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: 'white',
                minHeight: '100px',
                aspectRatio: '1',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#007bff'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(0,123,255,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#eee'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{flexShrink: 0}}>
                <IconComponent size={size} tone={tone} />
              </div>
              <span
                style={{
                  fontSize: '10px',
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  color: '#666',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {iconName}
              </span>
            </div>
          ))}
        </div>

        {filteredIcons.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#999',
            }}
          >
            <p style={{fontSize: '18px', marginBottom: '8px'}}>
              No icons found
            </p>
            <p style={{fontSize: '14px'}}>Try searching for something else</p>
          </div>
        )}

        {selectedIcon && (
          <IconPopover
            iconName={selectedIcon.name}
            position={selectedIcon.position}
            onClose={() => setSelectedIcon(null)}
          />
        )}
      </div>
    </>
  )
}

export const IconGrid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive icon library with search and live preview. Use the Controls below to change size and tone of all icons. Click any icon to copy import code.',
      },
    },
  },
  render: (args) => <IconGridComponent {...args} />,
  args: {
    size: 'md',
    tone: 'primary',
  },
}
