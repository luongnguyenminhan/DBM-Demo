'use client';

import React from 'react';
import Typography from '@/components/atomic/typo';
import Card from '@/components/atomic/card';
import DropdownMenu from '@/components/molecules/dropdown';
import { 
  faUser, 
  faEdit, 
  faTrash, 
  faCog, 
  faEllipsisV,
  faChevronDown, 
  faFlag,
  faHeart,
  faShare,
  faBookmark,
  faLanguage,
  faGlobe,
  faThumbsUp,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Heading, Text } = Typography;

export default function MoleculesShowcase() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center">
        <Heading level="h1" size="4xl" withGradient>Molecules Showcase</Heading>
        <Text size="xl" variant="muted" className="mt-4">
          A comprehensive display of molecular components
        </Text>
      </div>

      {/* Dropdown Components */}
      <section id="dropdowns" className="space-y-8">
        <Heading level="h2">Dropdown Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Dropdown Variants" size="small">
            <div className="flex flex-col space-y-4 items-start">
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Profile', icon: faUser },
                  { key: 'item-2', label: 'Settings', icon: faCog },
                  { key: 'divider-1', divider: true },
                  { key: 'item-3', label: 'Logout', danger: true }
                ]}
                variant="primary"
                label="Primary Dropdown"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Profile', icon: faUser },
                  { key: 'item-2', label: 'Settings', icon: faCog },
                  { key: 'divider-1', divider: true },
                  { key: 'item-3', label: 'Logout', danger: true }
                ]}
                variant="secondary"
                label="Secondary Dropdown"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Profile', icon: faUser },
                  { key: 'item-2', label: 'Settings', icon: faCog },
                  { key: 'divider-1', divider: true },
                  { key: 'item-3', label: 'Logout', danger: true }
                ]}
                variant="outline"
                label="Outline Dropdown"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Profile', icon: faUser },
                  { key: 'item-2', label: 'Settings', icon: faCog },
                  { key: 'divider-1', divider: true },
                  { key: 'item-3', label: 'Logout', danger: true }
                ]}
                variant="ghost"
                label="Ghost Dropdown"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Profile', icon: faUser },
                  { key: 'item-2', label: 'Settings', icon: faCog },
                  { key: 'divider-1', divider: true },
                  { key: 'item-3', label: 'Logout', danger: true }
                ]}
                variant="gradient"
                label="Gradient Dropdown"
              />
            </div>
          </Card>
          
          <Card title="Dropdown Sizes" size="small">
            <div className="flex flex-col space-y-4 items-start">
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Small Option 1' },
                  { key: 'item-2', label: 'Small Option 2' }
                ]}
                size="small"
                label="Small Dropdown"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Medium Option 1' },
                  { key: 'item-2', label: 'Medium Option 2' }
                ]}
                size="medium"
                label="Medium Dropdown"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Large Option 1' },
                  { key: 'item-2', label: 'Large Option 2' }
                ]}
                size="large"
                label="Large Dropdown"
              />
            </div>
          </Card>
          
          <Card title="Dropdown Placements" size="small">
            <div className="flex flex-col space-y-4 items-start">
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Bottom Placement' },
                  { key: 'item-2', label: 'Default Position' }
                ]}
                placement="bottom"
                label="Bottom (Default)"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Top Placement' },
                  { key: 'item-2', label: 'Above Button' }
                ]}
                placement="top"
                label="Top"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Left Placement' },
                  { key: 'item-2', label: 'Left of Button' }
                ]}
                placement="left"
                label="Left"
                menuClassName="w-[150px]"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Right Placement' },
                  { key: 'item-2', label: 'Right of Button' }
                ]}
                placement="right"
                label="Right"
                menuClassName="w-[150px]"
              />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Interactive Dropdown Items" size="small">
            <div className="space-y-4">
              <DropdownMenu
                items={[
                  { 
                    key: 'item-1', 
                    label: 'Edit Profile', 
                    icon: faEdit,
                    onClick: () => alert('Edit Profile clicked!')
                  },
                  { 
                    key: 'item-2', 
                    label: 'Settings', 
                    icon: faCog,
                    onClick: () => alert('Settings clicked!')
                  },
                  { 
                    key: 'divider-1', 
                    divider: true 
                  },
                  { 
                    key: 'item-3', 
                    label: 'Delete Account', 
                    icon: faTrash,
                    danger: true,
                    onClick: () => alert('Delete Account clicked!')
                  }
                ]}
                label="Interactive Items"
                variant="primary"
              />
            </div>
          </Card>
          
          <Card title="Disabled Items & Features" size="small">
            <div className="flex flex-col space-y-4 items-start">
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Available Option', icon: faThumbsUp },
                  { key: 'item-2', label: 'Disabled Option', icon: faCog, disabled: true },
                  { key: 'divider-1', divider: true },
                  { key: 'item-3', label: 'Another Option', icon: faFlag }
                ]}
                label="With Disabled Item"
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Cannot Select', icon: faUser },
                  { key: 'item-2', label: 'Dropdown Disabled', icon: faCog }
                ]}
                label="Disabled Dropdown"
                isDisabled={true}
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'No Animation', icon: faUser },
                  { key: 'item-2', label: 'Simple Display', icon: faCog }
                ]}
                label="Without Animation"
                withAnimation={false}
              />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Full Width & Rounded" size="small">
            <div className="space-y-4">
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Full Width Item 1', icon: faGlobe },
                  { key: 'item-2', label: 'Full Width Item 2', icon: faLanguage }
                ]}
                label="Full Width Dropdown"
                isFullWidth={true}
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Rounded Item 1', icon: faBookmark },
                  { key: 'item-2', label: 'Rounded Item 2', icon: faShare }
                ]}
                label="Rounded Dropdown"
                rounded={true}
              />
            </div>
          </Card>
          
          <Card title="Custom Triggers" size="small">
            <div className="space-y-4">
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Option 1', icon: faHeart },
                  { key: 'item-2', label: 'Option 2', icon: faShare },
                  { key: 'item-3', label: 'Option 3', icon: faBookmark }
                ]}
                trigger={
                  <div className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 inline-flex items-center">
                    <FontAwesomeIcon icon={faEllipsisV} />
                    <span className="ml-2">Custom Trigger</span>
                  </div>
                }
              />
              
              <DropdownMenu
                items={[
                  { key: 'item-1', label: 'Chart Option 1', icon: faChartBar },
                  { key: 'item-2', label: 'Chart Option 2', icon: faChartBar }
                ]}
                trigger={
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 cursor-pointer">
                    <FontAwesomeIcon icon={faChevronDown} size="xs" />
                  </div>
                }
              />
            </div>
          </Card>
          
          <Card title="Behavior Options" size="small">
            <div className="space-y-4">
              <div className="flex flex-col items-start space-y-2">
                <Text>Stay open on selection:</Text>
                <DropdownMenu
                  items={[
                    { key: 'item-1', label: 'Won\'t Close', onClick: () => alert('Stays open!') },
                    { key: 'item-2', label: 'Also Won\'t Close', onClick: () => alert('Still open!') }
                  ]}
                  label="Keep Open"
                  closeOnSelect={false}
                />
              </div>
              
              <div className="flex flex-col items-start space-y-2">
                <Text>Default open state:</Text>
                <DropdownMenu
                  items={[
                    { key: 'item-1', label: 'I\'m visible by default' },
                    { key: 'item-2', label: 'Click elsewhere to close' }
                  ]}
                  label="Default Open"
                  defaultOpen={true}
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Summary */}
      <section className="pt-8 pb-16 text-center">
        <Heading level="h2" withGradient>Ready to Use</Heading>
        <Text size="lg" className="mt-4">
          These dropdown components provide flexible options for user interactions.
        </Text>
      </section>
    </div>
  );
}
