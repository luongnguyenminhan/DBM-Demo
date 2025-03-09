'use client';

import React from 'react';
import Typography from '@/components/atomic/typo';
import Card from '@/components/atomic/card';
import DropdownMenu from '@/components/molecules/dropdown';
import PaginationControl from '@/components/molecules/paginationControl';
import Alert from '@/components/molecules/alert';
import TabNavigation from '@/components/molecules/tabNavigation';
import Breadcrumb from '@/components/molecules/breadcrumb';
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
  faChartBar,
  faCheckCircle,
  faTimesCircle,
  faHome
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

      {/* Breadcrumb Components */}
      <section id="breadcrumbs" className="space-y-8">
        <Heading level="h2">Breadcrumb Navigation</Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Basic Breadcrumbs" size="small">
            <div className="space-y-6">
              <Breadcrumb
                items={[
                  { key: 'home', label: 'Home', href: '/' },
                  { key: 'products', label: 'Products', href: '/products' },
                  { key: 'category', label: 'Electronics', href: '/products/electronics' },
                ]}
              />

              <Breadcrumb
                items={[
                  { key: 'home', label: 'Home', href: '/' },
                  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
                  { key: 'settings', label: 'Settings', href: '/dashboard/settings' },
                ]}
                variant="primary"
                withCard
              />
            </div>
          </Card>

          <Card title="Sizes & Variants" size="small">
            <div className="space-y-6">
              <Breadcrumb
                items={[
                  { key: 'home', label: 'Home' },
                  { key: 'level1', label: 'Level 1' },
                  { key: 'level2', label: 'Level 2' },
                ]}
                size="small"
                variant="secondary"
              />

              <Breadcrumb
                items={[
                  { key: 'home', label: 'Home' },
                  { key: 'level1', label: 'Level 1' },
                  { key: 'level2', label: 'Level 2' },
                ]}
                size="large"
                variant="minimal"
              />
            </div>
          </Card>

          <Card title="With Icons & Custom Separator" size="small">
            <div className="space-y-6">
              <Breadcrumb
                items={[
                  { key: 'home', label: 'Home', icon: faHome },
                  { key: 'user', label: 'Profile', icon: faUser },
                  { key: 'settings', label: 'Settings', icon: faCog },
                ]}
                separator="slash"
                withHomeIcon
              />

              <Breadcrumb
                items={[
                  { key: 'home', label: 'Home' },
                  { key: 'products', label: 'Products' },
                  { key: 'detail', label: 'Product Detail' },
                ]}
                separator="dot"
              />
            </div>
          </Card>

          <Card title="Advanced Features" size="small">
            <div className="space-y-6">
              <Breadcrumb
                items={[
                  { key: 'home', label: 'Home' },
                  { key: 'category', label: 'Category' },
                  { key: 'subcategory', label: 'Subcategory' },
                  { key: 'product', label: 'Product' },
                  { key: 'detail', label: 'Detail' },
                ]}
                maxItems={3}
                withAnimation
              />

              <Breadcrumb
                items={[
                  { key: 'home', label: 'Home' },
                  { key: 'products', label: 'Products', disabled: true },
                  { key: 'active', label: 'Current Page' },
                ]}
                loading={false}
                withCard
                onSeparatorClick={(index) => console.log('Separator clicked:', index)}
              />
            </div>
          </Card>
        </div>
      </section>

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

      {/* Pagination Controls */}
      <section id="pagination" className="space-y-8">
        <Heading level="h2">Pagination Controls</Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Basic Variants" size="small">
            <div className="space-y-6">
              <PaginationControl
                totalPages={10}
                currentPage={1}
                onChange={(page) => console.log('Page changed to:', page)}
                variant="primary"
              />
              
              <PaginationControl
                totalPages={10}
                currentPage={5}
                onChange={(page) => console.log('Page changed to:', page)}
                variant="secondary"
              />
              
              <PaginationControl
                totalPages={10}
                currentPage={7}
                onChange={(page) => console.log('Page changed to:', page)}
                variant="outline"
              />

              <PaginationControl
                totalPages={10}
                currentPage={3}
                onChange={(page) => console.log('Page changed to:', page)}
                variant="ghost"
              />
            </div>
          </Card>
          
          <Card title="Sizes & Alignments" size="small">
            <div className="space-y-6">
              <PaginationControl
                totalPages={5}
                currentPage={2}
                onChange={(page) => console.log('Page changed to:', page)}
                size="small"
              />
              
              <PaginationControl
                totalPages={5}
                currentPage={3}
                onChange={(page) => console.log('Page changed to:', page)}
                size="medium"
                align="center"
              />
              
              <PaginationControl
                totalPages={5}
                currentPage={4}
                onChange={(page) => console.log('Page changed to:', page)}
                size="large"
                align="right"
              />
            </div>
          </Card>

          <Card title="Advanced Features" size="small">
            <div className="space-y-6">
              <PaginationControl
                totalPages={20}
                currentPage={5}
                onChange={(page) => console.log('Page changed to:', page)}
                showQuickJump
                showTotal
                totalItems={187}
                pageSize={10}
                showFirstLastButtons
              />
              
              <PaginationControl
                totalPages={15}
                currentPage={3}
                onChange={(page) => console.log('Page changed to:', page)}
                siblingCount={2}
                withAnimation
                showFirstLastButtons
              />
            </div>
          </Card>

          <Card title="Styling Options" size="small">
            <div className="space-y-6">
              <PaginationControl
                totalPages={8}
                currentPage={4}
                onChange={(page) => console.log('Page changed to:', page)}
                rounded
                withBackground
                withBorder={false}
              />
              
              <PaginationControl
                totalPages={8}
                currentPage={2}
                onChange={(page) => console.log('Page changed to:', page)}
                isFullWidth
                withBackground
                rounded
              />

              <PaginationControl
                totalPages={8}
                currentPage={6}
                onChange={(page) => console.log('Page changed to:', page)}
                isDisabled
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Alert Components */}
      <section id="alerts" className="space-y-8">
        <Heading level="h2">Alert Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Basic Alerts" size="small">
            <div className="space-y-4">
              <Alert
                message="Success alert message"
                variant="success"
              />
              <Alert
                message="Error alert message"
                variant="error"
              />
              <Alert
                message="Warning alert message"
                variant="warning"
              />
              <Alert
                message="Info alert message"
                variant="info"
              />
            </div>
          </Card>

          <Card title="With Description" size="small">
            <div className="space-y-4">
              <Alert
                message="Success with description"
                description="This is a success message with additional details."
                variant="success"
                icon={faCheckCircle}
              />
              <Alert
                message="Error with description"
                description="This is an error message with additional details."
                variant="error"
                icon={faTimesCircle}
              />
            </div>
          </Card>

          <Card title="Sizes & Styles" size="small">
            <div className="space-y-4">
              <Alert
                message="Small alert"
                size="small"
                variant="info"
              />
              <Alert
                message="Medium alert with rounded corners"
                size="medium"
                rounded
                variant="success"
              />
              <Alert
                message="Large alert without background"
                size="large"
                withBackground={false}
                variant="warning"
              />
            </div>
          </Card>

          <Card title="Interactive Alerts" size="small">
            <div className="space-y-4">
              <Alert
                message="Alert with action"
                actionLabel="Undo"
                onAction={() => alert('Action clicked')}
                variant="info"
              />
              <Alert
                message="Auto-closing alert"
                autoClose
                autoCloseDuration={5000}
                variant="success"
              />
              <Alert
                message="Custom styled alert"
                withShadow
                rounded
                withBorder={false}
                variant="warning"
              />
            </div>
          </Card>

          <Card title="Floating Alerts" size="small">
            <div className="space-y-4">
              <Alert
                message="Top right alert"
                position="top-right"
                isFloating
                variant="info"
              />
              <Alert
                message="Bottom left alert"
                position="bottom-left"
                isFloating
                variant="success"
              />
            </div>
          </Card>

          <Card title="Border Radius Variants" size="small">
            <div className="space-y-4">
              <Alert
                message="Small border radius"
                variant="info"
                borderRadius="small"
              />
              <Alert
                message="Medium border radius"
                variant="success"
                borderRadius="medium"
              />
              <Alert
                message="Large border radius"
                variant="warning"
                borderRadius="large"
              />
              <Alert
                message="Full border radius"
                variant="error"
                borderRadius="full"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Tab Navigation */}
      <section id="tabs" className="space-y-8">
        <Heading level="h2">Tab Navigation</Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Basic Tabs" size="small">
            <TabNavigation
              tabs={[
                { key: 'tab1', label: 'Tab 1', content: <div className="p-4">Content for Tab 1</div> },
                { key: 'tab2', label: 'Tab 2', content: <div className="p-4">Content for Tab 2</div> },
                { key: 'tab3', label: 'Tab 3', content: <div className="p-4">Content for Tab 3</div> },
              ]}
              variant="default"
            />
          </Card>

          <Card title="Tabs with Icons" size="small">
            <TabNavigation
              tabs={[
                { key: 'profile', label: 'Profile', icon: faUser, content: <div className="p-4">Profile Content</div> },
                { key: 'settings', label: 'Settings', icon: faCog, content: <div className="p-4">Settings Content</div> },
                { key: 'notifications', label: 'Alerts', icon: faFlag, content: <div className="p-4">Notifications Content</div> },
              ]}
              withIcon
              variant="primary"
              borderRadius="medium"
            />
          </Card>

          <Card title="Tabs with Badges" size="small">
            <TabNavigation
              tabs={[
                { key: 'inbox', label: 'Inbox', badge: '3', badgeVariant: 'primary', content: <div className="p-4">Inbox Content</div> },
                { key: 'spam', label: 'Spam', badge: '12', badgeVariant: 'warning', content: <div className="p-4">Spam Content</div> },
                { key: 'archive', label: 'Archive', content: <div className="p-4">Archive Content</div> },
              ]}
              variant="outline"
              borderRadius="medium"
            />
          </Card>

          <Card title="Advanced Features" size="small">
            <TabNavigation
              tabs={[
                { key: 'tab1', label: 'Tab 1', closable: true, content: <div className="p-4">Closable Tab</div> },
                { key: 'tab2', label: 'Tab 2', disabled: true, content: <div className="p-4">Disabled Tab</div> },
                { key: 'tab3', label: 'Tab 3', content: <div className="p-4">Normal Tab</div> },
              ]}
              variant="secondary"
              withGradientIndicator
              withScrollIndicators
              allowAddTab
              onAddTab={() => alert('Add new tab clicked')}
              onTabClose={(key) => alert(`Close tab ${key} clicked`)}
              borderRadius="medium"  // Add border radius
            />
          </Card>

          <Card title="Vertical Tabs" size="small">
            <TabNavigation
              tabs={[
                { key: 'tab1', label: 'Section 1', content: <div className="p-4">Content 1</div> },
                { key: 'tab2', label: 'Section 2', content: <div className="p-4">Content 2</div> },
                { key: 'tab3', label: 'Section 3', content: <div className="p-4">Content 3</div> },
              ]}
              orientation="vertical"
              variant="minimal"
              borderRadius="medium"
            />
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
