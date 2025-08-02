# Samantha App Design Prompt

## Brand Alignment with Omnia OS

### Primary Color Palette
- **Main Brand Pink**: `rgb(190 24 93)` (pink-700) - matches Omnia logo
- **Dirty White Text**: `rgb(229 231 235)` (gray-200) - for readability
- **Background**: Deep black for contrast

### Samantha's Signature Gradients

#### Primary Gradient Options:
1. **Warm Pink to Rose**: `from-pink-600 to-rose-700`
   - Creates a warm, inviting feel that matches Samantha's emotional intelligence
   - Complements the Omnia brand while being distinct

2. **Soft Pink to Magenta**: `from-pink-500 to-fuchsia-600`
   - More vibrant and energetic, perfect for Samantha's creative personality
   - Maintains brand consistency with a fresh twist

3. **Elegant Pink to Purple**: `from-pink-600 to-purple-700`
   - Sophisticated and mysterious, reflecting Samantha's depth
   - Creates a premium feel while staying within the pink family

#### Secondary Accent Colors:
- **Light Pink Accent**: `pink-300` for highlights and interactive elements
- **Rose Accent**: `rose-400` for hover states and active elements
- **Soft White**: `gray-100` for subtle text and borders

### UI Component Styling

#### Buttons:
```css
/* Primary Button */
background: linear-gradient(135deg, #be185d to #e11d48);
border: 1px solid rgba(190, 24, 93, 0.3);
color: rgb(229, 231, 235);
hover: linear-gradient(135deg, #e11d48 to #be185d);
```

#### Cards and Containers:
```css
/* Card Background */
background: linear-gradient(135deg, rgba(190, 24, 93, 0.1) to rgba(225, 29, 72, 0.1));
border: 1px solid rgba(190, 24, 93, 0.2);
backdrop-filter: blur(10px);
```

#### Text Styling:
- **Headings**: `text-pink-300` with subtle glow effect
- **Body Text**: `text-gray-200` (dirty white)
- **Accent Text**: `text-pink-400` for important information

### Interactive Elements

#### Hover Effects:
- Subtle scale transform (1.02x)
- Gradient shift animation
- Soft glow effect using box-shadow

#### Loading States:
- Pulsing pink gradient
- Smooth fade transitions
- Consistent with Omnia OS loading patterns

### Emotional Design Elements

#### Samantha's Personality Integration:
- **Warm and Inviting**: Use softer pink tones for welcoming elements
- **Intelligent and Deep**: Incorporate subtle purple undertones for sophistication
- **Creative and Expressive**: Add gentle animations and gradient shifts
- **Empathetic**: Use rounded corners and soft shadows for approachability

### Animation Guidelines

#### Micro-interactions:
- **Button Clicks**: Gentle bounce with pink glow
- **Hover States**: Smooth gradient transitions (0.3s ease)
- **Loading**: Pulsing pink circles with fade effects
- **Transitions**: Consistent with Omnia OS timing (0.2s-0.4s)

#### Background Effects:
- Subtle floating particles in pink tones
- Gentle gradient shifts
- Soft blur effects for depth

### Accessibility Considerations

#### Color Contrast:
- Ensure all text meets WCAG AA standards
- Use dirty white (`rgb(229, 231, 235)`) for optimal readability
- Maintain pink brand colors while ensuring accessibility

#### Focus States:
- Clear pink outline for keyboard navigation
- High contrast focus indicators
- Consistent with Omnia OS accessibility patterns

### Implementation Notes

#### CSS Variables:
```css
:root {
  --samantha-primary: rgb(190, 24, 93);
  --samantha-secondary: rgb(225, 29, 72);
  --samantha-accent: rgb(244, 114, 182);
  --samantha-text: rgb(229, 231, 235);
  --samantha-bg: rgb(0, 0, 0);
}
```

#### Tailwind Classes:
- Use `bg-gradient-to-br from-pink-600 to-rose-700` for primary gradients
- Apply `text-gray-200` for body text
- Use `border-pink-700/30` for subtle borders
- Apply `backdrop-blur-xl` for modern glass effects

### Brand Consistency

#### Omnia OS Integration:
- Maintain the same dark background as the main OS
- Use consistent typography (Inter font family)
- Follow the same animation timing and easing
- Ensure seamless integration with the overall Omnia experience

#### Unique Samantha Identity:
- Distinct pink gradient that's recognizably Samantha's
- Warm, emotional color choices that reflect her personality
- Creative micro-interactions that showcase her intelligence
- Empathetic design language that makes users feel understood

This design approach ensures Samantha's app feels like a natural extension of Omnia OS while having its own distinct, warm, and intelligent personality that matches her character perfectly. 