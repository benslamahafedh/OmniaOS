# Companion Video Setup Guide

This guide explains how to add looping videos to the League of Legends-style companion selection interface.

## Video Requirements

### File Format
- **Format**: MP4 (recommended for web compatibility)
- **Codec**: H.264
- **Resolution**: 1920x1080 or higher
- **Frame Rate**: 30fps or 60fps
- **Duration**: 10-30 seconds (will loop automatically)

### File Size
- **Recommended**: Under 50MB per video
- **Maximum**: 100MB per video
- Use compression to optimize for web delivery

## File Structure

Create the following directory structure in the `public` folder:

```
public/
└── videos/
    ├── samantha-loop.mp4
    ├── elias-loop.mp4
    └── lyra-loop.mp4
```

## Video Content Guidelines

### Samantha (Emotional Intelligence)
- Warm, empathetic expressions
- Soft lighting with red/pink tones
- Gentle movements or ambient effects
- Focus on facial expressions showing understanding

### Elias (Analytical Mind)
- Technical, focused appearance
- Blue/cyan color scheme
- Data visualizations or code in background
- Logical, confident demeanor

### Lyra (Creative Spirit)
- Artistic, imaginative visuals
- Purple/pink gradients
- Creative elements (brushes, colors, designs)
- Expressive, inspiring movements

## Implementation

Once videos are added to the `public/videos/` directory, uncomment the video element in `CompanionSelection.tsx`:

```tsx
{/* Replace the placeholder with this video element */}
<video
  autoPlay
  loop
  muted
  className="absolute inset-0 w-full h-full object-cover video-overlay"
>
  <source src={activeCompanionData.videoUrl} type="video/mp4" />
</video>
```

## Technical Notes

### Performance
- Videos are set to `autoPlay`, `loop`, and `muted` for optimal user experience
- The `object-cover` class ensures videos fill the container properly
- Videos will automatically loop forever as requested

### Fallback
- If videos fail to load, the current image placeholder will remain visible
- Consider adding multiple video formats for broader browser support

### Mobile Considerations
- Videos may not autoplay on mobile devices due to browser restrictions
- Consider showing a play button overlay for mobile users
- Reduce video quality/size for mobile to improve loading times

## Adding New Companions

When adding new companions:

1. Add the video file to `public/videos/`
2. Update the `companions` array in `CompanionSelection.tsx`
3. Include the video URL in the companion object
4. Ensure the video follows the same quality and style guidelines

## Troubleshooting

### Video Not Playing
- Check file path is correct
- Ensure video file is in `public/videos/` directory
- Verify MP4 format and H.264 codec
- Check browser console for errors

### Performance Issues
- Reduce video file size through compression
- Consider using video hosting services for large files
- Implement lazy loading for videos not currently selected

### Browser Compatibility
- Test across different browsers (Chrome, Firefox, Safari, Edge)
- Consider adding WebM format as alternative
- Provide fallback images for unsupported browsers 