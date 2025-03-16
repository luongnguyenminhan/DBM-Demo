'use client';

import React, { useState } from 'react';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Icon, { IconButton } from '@/components/atomic/icon';
import Input from '@/components/atomic/input';
import Modal, { ConfirmModal } from '@/components/atomic/modal';
import Spinner, { Loader } from '@/components/atomic/spinner';
import Typography from '@/components/atomic/typo';
import Badge, { Tag } from '@/components/atomic/badge';
import Avatar, { AvatarGroup } from '@/components/atomic/avatar';
import Tooltip from '@/components/atomic/tooltip';

import {
  faUser,
  faEnvelope,
  faCheck,
  faBell,
  faCog,
  faHeart,
  faSearch,
  faStar,
  faEllipsisV,
  faTrash,
  faEdit,
  faInfoCircle,
  faExclamationTriangle,
  faPlus,
  faArrowRight,
  faQuestion,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';

const { Heading, Text } = Typography;

export default function ComponentShowcase() {
  // State for interactive components
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handler for simulated loading
  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center">
        <Heading level="h1" size="4xl" withGradient>Component Showcase</Heading>
        <Text size="xl" variant="muted" className="mt-4">
          A comprehensive display of all UI components
        </Text>
      </div>

      {/* Button Variants */}
      <section id="buttons" className="space-y-8">
        <Heading level="h2">Button Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Button Variants" size="small">
            <div className="space-y-2">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="gradient">Gradient Button</Button>
            </div>
          </Card>
          
          <Card title="Button Sizes" size="small">
            <div className="space-y-2">
              <Button variant="primary" size="small">Small Button</Button>
              <Button variant="primary" size="medium">Medium Button</Button>
              <Button variant="primary" size="large">Large Button</Button>
            </div>
          </Card>
          
          <Card title="Button States" size="small">
            <div className="space-y-2">
              <Button variant="primary" isLoading>Loading Button</Button>
              <Button variant="primary" isDisabled>Disabled Button</Button>
              <Button variant="primary" isFullWidth>Full Width Button</Button>
              <Button variant="primary" rounded>Rounded Button</Button>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Button with Icons" size="small">
            <div className="space-y-2">
              <Button variant="primary" leftIcon={faUser}>Left Icon</Button>
              <Button variant="secondary" rightIcon={faArrowRight}>Right Icon</Button>
              <Button variant="outline" leftIcon={faPlus} rightIcon={faArrowRight}>Both Icons</Button>
            </div>
          </Card>
          
          <Card title="Ripple Effect" size="small">
            <div className="space-y-2">
              <Button variant="primary" withRipple>With Ripple</Button>
              <Button variant="primary" withRipple={false}>Without Ripple</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Card Variants */}
      <section id="cards" className="space-y-8">
        <Heading level="h2">Card Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Default Card" variant="default">
            This is a default card with standard styling.
          </Card>
          
          <Card 
            title="Primary Card" 
            variant="primary"
            headerIcon={faHeart}
          >
            This is a primary card with a header icon.
          </Card>
          
          <Card 
            title="Secondary Card" 
            variant="secondary"
            subtitle="With a subtitle"
          >
            This is a secondary card with a subtitle.
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            title="Outlined Card" 
            variant="outlined"
            withShadow={false}
            footer="Footer content"
          >
            This is an outlined card with a footer.
          </Card>
          
          <Card 
            title="Ghost Card" 
            variant="ghost" 
            withBorder={false}
            withShadow={false}
          >
            This is a ghost card without borders or shadows.
          </Card>
          
          <Card 
            title="Card with Action" 
            headerAction={<Button size="small" variant="primary">Action</Button>}
            footerAction={<Button size="small" variant="outline">View</Button>}
            footer="Last updated: Today"
          >
            This card has actions in the header and footer.
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            title="Interactive Card" 
            withAnimation 
            withHover
            onClick={() => alert('Card clicked!')}
          >
            This card is clickable and has hover animations.
          </Card>
          
          <Card 
            withGradient 
            rounded 
            roundedSize="lg"
            withBorder={false}
            title="Gradient Card"
          >
            <p className="text-white">This card has a gradient background.</p>
          </Card>
        </div>
      </section>

      {/* Icon Variants */}
      <section id="icons" className="space-y-8">
        <Heading level="h2">Icon Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Icon Variants" size="small">
            <div className="flex justify-around">
              <Icon icon={faUser} variant="default" />
              <Icon icon={faUser} variant="primary" />
              <Icon icon={faUser} variant="secondary" />
              <Icon icon={faUser} variant="success" />
              <Icon icon={faUser} variant="warning" />
              <Icon icon={faUser} variant="error" />
              <Icon icon={faUser} variant="info" />
            </div>
          </Card>
          
          <Card title="Icon Sizes" size="small">
            <div className="flex items-end justify-around">
              <Icon icon={faUser} size="xs" />
              <Icon icon={faUser} size="sm" />
              <Icon icon={faUser} size="md" />
              <Icon icon={faUser} size="lg" />
              <Icon icon={faUser} size="xl" />
              <Icon icon={faUser} size="2xl" />
            </div>
          </Card>
          
          <Card title="Icon Animations" size="small">
            <div className="flex justify-around">
              <Icon icon={faStar} animationVariant="pulse" />
              <Icon icon={faSearch} animationVariant="spin" />
              <Icon icon={faBell} animationVariant="bounce" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Interactive Icons" size="small">
            <div className="flex justify-around">
              <Icon icon={faHeart} isButton withAnimation onClick={() => alert('Icon clicked!')} />
              <Icon icon={faEdit} isButton withAnimation customColor="#FF5722" />
              <Icon icon={faTrash} isButton withAnimation variant="error" />
            </div>
          </Card>
          
          <Card title="Icon Buttons" size="small">
            <div className="flex justify-around">
              <IconButton icon={faPlus} withBackground />
              <IconButton icon={faCog} variant="primary" withBackground withBorder />
              <IconButton icon={faEllipsisV} padding="md" rounded />
            </div>
          </Card>
        </div>
      </section>

      {/* Input Variants */}
      <section id="inputs" className="space-y-8">
        <Heading level="h2">Input Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Input Variants" size="small">
            <div className="space-y-4">
              <Input label="Default Input" placeholder="Default input" />
              <Input variant="primary" label="Primary Input" placeholder="Primary input" />
              <Input variant="secondary" label="Secondary Input" placeholder="Secondary input" />
              <Input variant="outlined" label="Outlined Input" placeholder="Outlined input" />
              <Input variant="ghost" label="Ghost Input" placeholder="Ghost input" />
            </div>
          </Card>
          
          <Card title="Input States" size="small">
            <div className="space-y-4">
              <Input label="Required Input" isRequired placeholder="Required input" />
              <Input label="Disabled Input" isDisabled placeholder="Disabled input" />
              <Input label="Error Input" isError errorMessage="This field has an error" placeholder="Error input" />
              <Input label="With Helper Text" helperText="This is a helper text" placeholder="Input with helper" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Input with Icons" size="small">
            <div className="space-y-4">
              <Input leftIcon={faUser} placeholder="Left icon" />
              <Input rightIcon={faSearch} placeholder="Right icon" />
              <Input leftIcon={faEnvelope} rightIcon={faCheck} placeholder="Both icons" />
            </div>
          </Card>
          
          <Card title="Input Sizes" size="small">
            <div className="space-y-4">
              <Input size="small" placeholder="Small input" />
              <Input size="medium" placeholder="Medium input" />
              <Input size="large" placeholder="Large input" />
            </div>
          </Card>
          
          <Card title="Input Variations" size="small">
            <div className="space-y-4">
              <Input rounded placeholder="Rounded input" />
              <Input withFloatingLabel label="Floating Label" placeholder="Floating label" />
              <Input asTextArea rows={3} placeholder="Text area input" />
            </div>
          </Card>
        </div>
      </section>

      {/* Modal Variants */}
      <section id="modals" className="space-y-8">
        <Heading level="h2">Modal Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Basic Modal" size="small">
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
              leftIcon={faPlus}
            >
              Open Modal
            </Button>
          </Card>
          
          <Card title="Confirmation Modal" size="small">
            <Button 
              variant="ghost" 
              onClick={() => setIsConfirmModalOpen(true)}
              leftIcon={faTrash}
            >
              Delete Item
            </Button>
          </Card>
          
          <Card title="Modal Sizes" size="small">
            <div className="space-y-2">
              <Text>Modal sizes & positions:</Text>
              <Text>Modal positions: center, top, right, bottom, left</Text>
            </div>
          </Card>
        </div>

        {/* Modal examples */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
          headerIcon={faInfoCircle}
          size="md"
          position="center"
        >
          <div className="py-4">
            <Text>This is a basic modal example with a header, content and footer.</Text>
          </div>
        </Modal>

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Confirm Deletion"
          message="Are you sure you want to delete this item? This action cannot be undone."
          onConfirm={() => {
            alert('Item deleted!');
            setIsConfirmModalOpen(false);
          }}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmVariant="primary"
          headerIcon={faExclamationTriangle}
        />
      </section>

      {/* Spinner Variants */}
      <section id="spinners" className="space-y-8">
        <Heading level="h2">Spinner Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Spinner Types" size="small">
            <div className="flex justify-around items-center h-16">
              <Spinner type="icon" />
              <Spinner type="border" />

            </div>
          </Card>
          
          <Card title="Spinner Variants" size="small">
            <div className="flex justify-around items-center h-16">
              <Spinner variant="primary" />
              <Spinner variant="secondary" />
              <Spinner variant="success" />
              <Spinner variant="warning" />
              <Spinner variant="error" />
            </div>
          </Card>
          
          <Card title="Spinner Sizes" size="small">
            <div className="flex items-center justify-around h-16">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Spinner with Text" size="small">
            <div className="flex justify-around items-center h-16">
              <Spinner text="Loading..." textPlacement="right" />
              <Spinner text="Please wait" textPlacement="bottom" />
            </div>
          </Card>
          
          <Card title="Loading State" size="small">
            <div className="space-y-4">
              <Button 
                variant="primary" 
                isLoading={isLoading}
                onClick={handleLoadingClick}
                isFullWidth
              >
                {isLoading ? 'Loading...' : 'Click to Load'}
              </Button>
              
              <Loader
                isLoading={isLoading}
                height="100px"
              >
                <div className="p-4 border rounded">
                  Content is loaded!
                </div>
              </Loader>
            </div>
          </Card>
        </div>
      </section>

      {/* Typography Variants */}
      <section id="typography" className="space-y-8">
        <Heading level="h2">Typography Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Headings" size="small">
            <div className="space-y-2">
              <Heading level="h1">Heading 1</Heading>
              <Heading level="h2">Heading 2</Heading>
              <Heading level="h3">Heading 3</Heading>
              <Heading level="h4">Heading 4</Heading>
              <Heading level="h5">Heading 5</Heading>
              <Heading level="h6">Heading 6</Heading>
            </div>
          </Card>
          
          <Card title="Text Variants" size="small">
            <div className="space-y-2">
              <Text variant="default">Default Text</Text>
              <Text variant="primary">Primary Text</Text>
              <Text variant="secondary">Secondary Text</Text>
              <Text variant="success">Success Text</Text>
              <Text variant="warning">Warning Text</Text>
              <Text variant="error">Error Text</Text>
              <Text variant="info">Info Text</Text>
              <Text variant="muted">Muted Text</Text>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Text Weight" size="small">
            <div className="space-y-2">
              <Text weight="light">Light Weight</Text>
              <Text weight="regular">Regular Weight</Text>
              <Text weight="medium">Medium Weight</Text>
              <Text weight="semibold">Semibold Weight</Text>
              <Text weight="bold">Bold Weight</Text>
              <Text weight="extrabold">Extrabold Weight</Text>
            </div>
          </Card>
          
          <Card title="Text Styling" size="small">
            <div className="space-y-2">
              <Text italic>Italic Text</Text>
              <Text underline>Underlined Text</Text>
              <Text lineThrough>Strikethrough Text</Text>
              <Text transform="uppercase">Uppercase Text</Text>
              <Text withGradient>Gradient Text</Text>
              <Text truncate>This text will truncate if its too long...asdadasdasdasdasdasdasdadasda</Text>
            </div>
          </Card>
          
          <Card title="Special Types" size="small">
            <div className="space-y-2">
              <Text paragraph>This is a paragraph with proper spacing below it.</Text>
              <Text asLink href="#typography">This is a link</Text>
              <Text withAnimation animationType="fade">Animated Text</Text>
            </div>
          </Card>
        </div>
      </section>

{/* Badge Variants */}
<section id="badges" className="space-y-8">
    <Heading level="h2">Badge Variants</Heading>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Badge Variants" size="small">
            <div className="flex flex-wrap gap-4 mb-2">
                <Badge content="Default" variant="default" />
                <Badge content="Primary" variant="primary" />
                <Badge content="Secondary" variant="secondary" />
                <Badge content="Success" variant="success" />
                <Badge content="Warning" variant="warning" />
                <Badge content="Error" variant="error" />
                <Badge content="Info" variant="info" />
                <Badge content="Dark" variant="dark" />
                <Badge content="Light" variant="light" />
            </div>
        </Card>
        
        <Card title="Badge Shapes & Sizes" size="small">
            <div className="flex flex-wrap gap-3 mb-2">
                <Badge content="XS" size="xs" />
                <Badge content="SM" size="sm" />
                <Badge content="MD" size="md" />
                <Badge content="LG" size="lg" />
            </div>
            <div className="flex flex-wrap gap-3">
                <Badge content="Square" shape="square" />
                <Badge content="Rounded" shape="rounded" />
                <Badge content="Pill" shape="pill" />
            </div>
        </Card>
        
        <Card title="Badge States" size="small">
            <div className="flex flex-wrap gap-3">
                <Badge content="Animation" withAnimation />
                <Badge content={42} asCounter maxCount={99} />
                <Badge content="Click" onClick={() => alert('Badge clicked')} />
                <Badge content="Disabled" isDisabled onClick={() => alert('Not clickable')} />
                <Badge content="Border" withBorder borderColor="#5D87FF" />
            </div>
        </Card>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Badge with Icons" size="small">
            <div className="flex flex-wrap gap-3">
                <Badge content="Notifications" leftIcon={faBell} />
                <Badge content="Starred" rightIcon={faStar} />
                <Badge leftIcon={faStar} rightIcon={faBell} content="Both" />
            </div>
        </Card>
        
        <Card title="Dot Badges & Floating" size="small">
            <div className="flex flex-wrap gap-6 items-center">
                <Badge isDot variant="primary" />
                <Badge isDot variant="error" size="md" />
                
                <div className="relative h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon icon={faBell} size="lg" />
                    <Badge isDot variant="error" isFloating />
                </div>
                
                <div className="relative h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon icon={faEnvelope} size="lg" />
                    <Badge content="9" isFloating position="top-right" />
                </div>
            </div>
        </Card>
    </div>
    
    <Card title="Tags" size="small">
        <div className="flex flex-wrap gap-3">
            <Tag content="Default Tag" />
            <Tag content="Primary" variant="primary" />
            <Tag content="Closable" closable onClose={() => alert('Tag closed')} />
            <Tag content="With Icon" leftIcon={faStar} variant="success" />
            <Tag content="Bordered" withBorder borderColor="#5D87FF" />
        </div>
    </Card>
</section>

      {/* Avatar Variants */}
      <section id="avatars" className="space-y-8">
        <Heading level="h2">Avatar Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Avatar Sizes" size="small">
            <div className="flex items-end justify-around">
              <Avatar size="xs" name="John Doe" />
              <Avatar size="sm" name="John Doe" />
              <Avatar size="md" name="John Doe" />
              <Avatar size="lg" name="John Doe" />
              <Avatar size="xl" name="John Doe" />
              <Avatar size="2xl" name="John Doe" />
            </div>
          </Card>
          
          <Card title="Avatar Shapes" size="small">
            <div className="flex justify-around">
              <Avatar shape="circle" name="Jane Smith" />
              <Avatar shape="square" name="Jane Smith" />
              <Avatar shape="rounded" name="Jane Smith" />
            </div>
          </Card>
          
          <Card title="Avatar Variants" size="small">
            <div className="flex justify-around">
              <Avatar variant="default" name="User" />
              <Avatar variant="primary" name="User" />
              <Avatar variant="secondary" name="User" />
              <Avatar variant="light" name="User" />
              <Avatar variant="dark" name="User" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Avatar with Image" size="small">
            <div className="flex justify-around">
              <Avatar 
                src="https://i.pravatar.cc/300?img=1" 
                alt="User 1"
                withBorder
                borderColor="#5D87FF"
              />
              <Avatar 
                src="https://i.pravatar.cc/300?img=2" 
                alt="User 2"
                withShadow
              />
              <Avatar 
                src="https://i.pravatar.cc/300?img=3" 
                alt="User 3"
                withBorder
                withShadow
              />
            </div>
          </Card>
          
          <Card title="Interactive Avatars" size="small">
            <div className="flex justify-around">
              <Avatar 
                name="John Doe" 
                withAnimation 
                onClick={() => alert('Avatar clicked!')}
              />
              <Avatar 
                src="https://i.pravatar.cc/300?img=4" 
                withAnimation
                onClick={() => alert('Avatar with image clicked!')}
              />
              <Avatar 
                icon={faStar}
                withAnimation
                onClick={() => alert('Avatar with icon clicked!')}
              />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Avatar with Status Badges" size="small">
            <div className="flex justify-around">
              <Badge isDot variant="success" isFloating position="bottom-right">
                <Avatar 
                  src="https://i.pravatar.cc/300?img=8" 
                  alt="Online User" 
                  size="lg"
                />
              </Badge>
              
              <Badge isDot variant="error" isFloating position="bottom-right">
                <Avatar 
                  src="https://i.pravatar.cc/300?img=9" 
                  alt="Offline User" 
                  size="lg"
                />
              </Badge>
              
              <Badge isDot variant="warning" isFloating position="bottom-right" withBorder borderColor="white">
                <Avatar 
                  name="Away User" 
                  size="lg"
                />
              </Badge>
              
              <Badge content="3" variant="primary" isFloating>
                <Avatar 
                  name="JD" 
                  size="lg" 
                  withBorder
                />
              </Badge>
            </div>
          </Card>
          
          <Card title="Avatar Group" size="small">
            <div className="space-y-4">
              <AvatarGroup 
                avatars={[
                  { src: "https://i.pravatar.cc/300?img=1", alt: "User 1" },
                  { src: "https://i.pravatar.cc/300?img=2", alt: "User 2" },
                  { src: "https://i.pravatar.cc/300?img=3", alt: "User 3" },
                  { src: "https://i.pravatar.cc/300?img=4", alt: "User 4" },
                  { name: "John Doe" },
                  { name: "Jane Smith" },
                ]}
                max={4}
              />
              
              <AvatarGroup 
                avatars={[
                  { src: "https://i.pravatar.cc/300?img=5", alt: "User 5" },
                  { src: "https://i.pravatar.cc/300?img=6", alt: "User 6" },
                  { name: "David Brown" },
                  { name: "Sarah Wilson" },
                ]}
                size="lg"
                spacing={-10}
                borderColor="#5D87FF"
              />
            </div>
          </Card>
        </div>

        <Card title="Custom Avatar Status Indicators" size="small">
          <div className="flex flex-wrap gap-8 justify-around">
            <div className="flex flex-col items-center gap-2">
              <Badge content="Admin" variant="primary" shape="pill" isFloating position="top-right" offset={[5, 0]}>
                <Avatar 
                  src="https://i.pravatar.cc/300?img=10" 
                  alt="Admin User" 
                  size="xl"
                  withBorder
                />
              </Badge>
              <Text>Role Badge</Text>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Avatar 
                  src="https://i.pravatar.cc/300?img=11" 
                  alt="User with Notification"
                  size="xl" 
                  withBorder
                />
                <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                  <Badge content={5} variant="error" withAnimation />
                </div>
              </div>
              <Text>Custom Position</Text>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <Badge
                content={<div className="h-3 w-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>}
                isFloating
                position="bottom-right"
                className="border-2 border-white p-0"
              >
                <Avatar 
                  name="Live Status" 
                  size="xl"
                  withShadow
                />
              </Badge>
              <Text>Custom Badge</Text>
            </div>
          </div>
        </Card>
      </section>

      {/* Tooltip Variants */}
      <section id="tooltips" className="space-y-8">
        <Heading level="h2">Tooltip Variants</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Tooltip Placements" size="small">
            <div className="flex flex-wrap justify-around gap-4 py-8">
              <Tooltip content="Top tooltip" placement="top">
                <Button variant="outline" size="small">Top</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" placement="bottom">
                <Button variant="outline" size="small">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left tooltip" placement="left">
                <Button variant="outline" size="small">Left</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" placement="right">
                <Button variant="outline" size="small">Right</Button>
              </Tooltip>
            </div>
          </Card>
          
          <Card title="Tooltip Triggers" size="small">
            <div className="flex flex-wrap justify-around gap-4 py-8">
              <Tooltip content="Hover to see tooltip" trigger="hover">
                <Button variant="primary" size="small">Hover</Button>
              </Tooltip>
              <Tooltip content="Click to see tooltip" trigger="click">
                <Button variant="secondary" size="small">Click</Button>
              </Tooltip>
            </div>
          </Card>
          
          <Card title="Tooltip with Icons" size="small">
            <div className="flex justify-around gap-4 py-8">
              <Tooltip content="Help information" placement="top">
                <IconButton icon={faQuestion} variant="primary" withBackground rounded />
              </Tooltip>
              <Tooltip content="Useful tip" placement="bottom">
                <IconButton icon={faLightbulb} variant="warning" withBackground rounded />
              </Tooltip>
              <Tooltip content="Important information" placement="right">
                <IconButton icon={faInfoCircle} variant="info" withBackground rounded />
              </Tooltip>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Tooltip with Delay & Offset" size="small">
            <div className="flex flex-wrap justify-around gap-4 py-8">
              <Tooltip content="Delayed tooltip" delay={500} placement="top">
                <Button variant="ghost" size="small">With Delay</Button>
              </Tooltip>
              <Tooltip content="Offset tooltip" offset={[0, 15]} placement="bottom">
                <Button variant="ghost" size="small">With Offset</Button>
              </Tooltip>
            </div>
          </Card>
          
          <Card title="Custom Tooltip Content" size="small">
            <div className="flex justify-around py-8">
              <Tooltip 
                content={
                  <div className="p-2">
                    <Text weight="bold">Rich Content</Text>
                    <Text size="xs">This tooltip has custom styling and content</Text>
                  </div>
                } 
                placement="top"
              >
                <Button variant="primary">Rich Tooltip</Button>
              </Tooltip>
            </div>
          </Card>
        </div>
      </section>

      {/* Summary */}
      <section className="pt-8 pb-16 text-center">
        <Heading level="h2" withGradient>Ready to Use</Heading>
        <Text size="lg" className="mt-4">
          These components are designed to work together for a consistent design experience.
        </Text>
        <div className="mt-8">
          <Button variant="gradient" size="large" leftIcon={faArrowRight}>
            Start Building
          </Button>
        </div>
      </section>
    </div>
  );
}
