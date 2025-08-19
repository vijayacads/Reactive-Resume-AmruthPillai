# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-12-19

### Added
- **Guest Mode**: Users can now use the app without creating an account
- **Automatic Guest User Creation**: Guest users are automatically created when needed
- **Seamless Experience**: No login barriers for basic resume creation and editing
- **Guest Mode Indicator**: Clear indication when using the app in guest mode
- **Welcome Message**: Helpful onboarding for new guest users

### Changed
- **Removed Login Requirements**: Dashboard and builder are now accessible without authentication
- **Simplified Onboarding**: "Get Started" button now goes directly to dashboard
- **Enhanced User Experience**: Reduced friction for new users
- **Backward Compatibility**: All existing authenticated user features remain unchanged

### Technical Changes
- **Backend**: Added guest user creation system with automatic user generation
- **Frontend**: Modified authentication flow to support guest users
- **API**: Resume creation and import endpoints now work without authentication
- **Database**: Guest users are stored with unique identifiers and no passwords

### Breaking Changes
- None - all existing functionality is preserved

## [1.0.0] - 2023-11-21

### Added
- Initial release of Reactive Resume
- Resume builder with drag-and-drop functionality
- Multiple resume templates
- PDF export functionality
- User authentication system
- Resume sharing capabilities
- AI-powered writing assistance
- Multi-language support
- Dark mode support
