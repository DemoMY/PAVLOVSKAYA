# MVP Version of Pavlovskaya Village App

## Overview
This is the Minimum Viable Product (MVP) version of the Pavlovskaya Village application. It focuses on core functionality without AI dependencies for more reliable operation.

## Key Features in MVP

1. **Taxi Module** - Fully functional with local taxi services, emergency numbers, bus schedules, pharmacies, food delivery, and government services
2. **Life Module** - Static information about village infrastructure status (without AI)
3. **Events Module** - Predefined events and activities (without AI)
4. **Chat Module** - Basic chat functionality with predefined responses (without AI)

## Files Created for MVP Version

1. `mvp-README.md` - Overview of the MVP approach
2. `services/geminiService-mvp.ts` - Mock data service instead of AI integration
3. `components/LifeModule-mvp.tsx` - Life module using mock data
4. `components/EventsModule-mvp.tsx` - Events module using mock data
5. `components/ChatModule-mvp.tsx` - Chat module with predefined responses
6. `App-mvp.tsx` - Main app component using MVP modules
7. `MVP-SUMMARY.md` - This summary document

## Changes from Full Version

- Removed AI dependencies (Google Gemini integration)
- Replaced dynamic AI-powered content with static/fake data
- Simplified data fetching logic
- More reliable offline functionality
- Faster loading times
- No need for API keys

## Benefits of MVP Approach

- More stable and predictable behavior
- No dependency on external AI services or API keys
- Faster development and testing cycles
- Better performance in areas with limited internet
- Easier to maintain and debug
- Lower operational costs

## How to Use

To run the MVP version, you can use the `App-mvp.tsx` component instead of the original `App.tsx`. The MVP version maintains the same beautiful UI and user experience while removing the complexity of AI integrations.

## Future Considerations

The MVP provides a solid foundation that can be enhanced with AI features later when needed. The architecture allows for easy integration of the original AI-powered services when the infrastructure is ready.