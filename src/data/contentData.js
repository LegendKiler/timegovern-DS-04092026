function getDate(daysAgo) {
  const now = new Date()
  now.setDate(now.getDate() - daysAgo)
  return now.toISOString().split('T')[0]
}

export const newsletterEditions = {
  weekly: [
    { 
      title: "Time Zone Changes This Week", 
      summary: "Latest DST switches and time zone updates across the globe [citation:12].", 
      date: getDate(7),
      content: "Daylight Saving Time (DST) transitions can affect your meetings and schedules. This week, Canada and the US observe DST changes, while Australia ends DST for 2026 [citation:12]. The United Kingdom and European Union are also adjusting their time standards this month [citation:12]."
    },
    { 
      title: "Sky Guide: Planet Watch & Meteor Showers", 
      summary: "Eta Aquarids and the May 2026 Full Moon are this week's highlights [citation:12].", 
      date: getDate(7),
      content: "The Eta Aquarid meteor shower peaks on May 5–6 this year [citation:12]. Venus and Jupiter are in a close approach this month [citation:2]. May will also feature two Full Moons and a rare Black Moon [citation:2]."
    },
    { 
      title: "World Clock Tips & Tricks", 
      summary: "Our drag-and-drop world clock lets you group, rename, and reorder locations for any team [citation:1].", 
      date: getDate(7),
      content: "TimeGovern's world clock allows you to create custom location groups by region, continent, or project. Drag-and-drop to reorder locations, rename them for clarity, and switch between 12-hour and 24-hour formats. This is ideal for coordinating distributed teams across multiple time zones [citation:1]."
    },
    { 
      title: "Calendar Hacks for Productivity", 
      summary: "Use the Date Pattern Calculator to find unique dates for special events [citation:1].", 
      date: getDate(7),
      content: "Our Date Pattern Calculator helps find dates with special characteristics, such as reversibility or repetition (like 10/10/10) [citation:1]. Perfect for couples planning weddings or organizations hosting events on memorable dates."
    },
    { 
      title: "This Week in Time History", 
      summary: "From the Greenwich meridian to DST, historical milestones shaped today's time systems [citation:1].", 
      date: getDate(7),
      content: "In 1884, the International Meridian Conference established the Greenwich meridian as the world's prime meridian [citation:1]. Daylight saving time was first proposed by Benjamin Franklin in 1784, though it wasn't widely adopted until World War I."
    },
  ],
  monthly: [
    { 
      title: "Monthly Time Zone Digest", 
      summary: "Moldova adopts European time standards; Australia ends DST 2026 [citation:12].", 
      date: getDate(30),
      content: "This month, Moldova has adopted European Union time standards [citation:12]. Australia officially ends Daylight Saving Time for 2026 [citation:12]. British Columbia has also adopted permanent DST [citation:12]."
    },
    { 
      title: "Astronomy Highlights This Month", 
      summary: "Two Full Moons, the Eta Aquarids, and a rare Black Moon [citation:2][citation:12].", 
      date: getDate(30),
      content: "August 2026 includes two First Quarter Moons across every time zone [citation:2]. The Perseid Meteor Shower peaks close to Full Moon this year [citation:2][citation:12]. A rare Black Moon occurs in the southern hemisphere [citation:2]."
    },
    { 
      title: "Premium Tools Spotlight", 
      summary: "Exclusive calendar templates and precise sun/moon data for supporters [citation:12].", 
      date: getDate(30),
      content: "Premium supporters now have access to exclusive calendar templates for PDF generation, plus the ability to add company logos [citation:12]. Our astronomical data is now precise to the second, enabling more accurate planning for eclipse-watchers and astronomers [citation:4]."
    },
    { 
      title: "Global Holidays Guide", 
      summary: "Vietnam adds a new public holiday on November 24 [citation:12].", 
      date: getDate(30),
      content: "This month, Vietnam has announced a new public holiday effective November 24 [citation:12]. We also track holidays across major markets, including the US, UK, Australia, and Canada, for professionals coordinating schedules globally [citation:5]."
    },
    { 
      title: "User Success Stories", 
      summary: "How global teams use TimeGovern for remote collaboration [citation:11].", 
      date: getDate(30),
      content: "Our members around the world use TimeGovern for their 'Photochallenge Focus' competitions [citation:11]. Users appreciate the easy-to-share world clocks and the accurate DST notifications that keep remote teams aligned across time zones [citation:11]."
    },
  ],
  yearly: [
    { 
      title: "Year in Time Zones", 
      summary: "Moldova, British Columbia, and Australia: all key time zone changes in 2026 [citation:12].", 
      date: getDate(365),
      content: "2026 has been a significant year for time zone changes. Moldova adopted European Union standards [citation:12]. British Columbia implemented permanent DST [citation:12]. Australia and the US also adjusted their DST schedules [citation:12]."
    },
    { 
      title: "Astronomy Yearbook", 
      summary: "2026 includes a total solar eclipse and major lunar events [citation:12].", 
      date: getDate(365),
      content: "The year 2026 is notable for a total solar eclipse visible across parts of the world [citation:12]. Multiple lunar eclipses and meteor showers (Perseids, Eta Aquarids) also occurred [citation:12][citation:2]. Friday the 13th appears twice this year [citation:12]."
    },
    { 
      title: "Top Tools & Features of the Year", 
      summary: "The Date Pattern Calculator and improved calendar selector were top features [citation:1].", 
      date: getDate(365),
      content: "This year, we launched the Date Pattern Calculator for unique date selection [citation:1]. The Date Selector received an upgraded calendar popup for easier entry [citation:1]. Our Flash Clocks widget also became available for personal websites [citation:1]."
    },
    { 
      title: "Community Highlights", 
      summary: "Trustpilot reviews praise our DST updates and global clock tools [citation:11].", 
      date: getDate(365),
      content: "Our community on Trustpilot has rated us 'Great' with 4.1/5 stars [citation:11]. Users particularly appreciate the 'all-in-one-page world time clocks' and the helpful DST notifications for scheduling meetings across time zones [citation:11]."
    },
    { 
      title: "What's Coming Next", 
      summary: "Mobile apps, more precise solar data, and expanded API services are planned [citation:1][citation:4].", 
      date: getDate(365),
      content: "We're planning major enhancements for next year, including mobile applications, more precise solar and moon data (down to the second), and a public API for developers [citation:1][citation:4]. We're also exploring AI-driven content features [citation:14]."
    },
  ],
}

export const podcastEpisodes = {
  weekly: [
    { 
      title: "The Time Zone Minute", 
      description: "Quick 5-minute update on time zone changes and DST transitions [citation:12].", 
      episode: 1, 
      date: getDate(7),
      audioUrl: "" // Will be generated dynamically via API
    },
    { 
      title: "Astronomy Shorts", 
      description: "5-minute digest of celestial events like meteor showers and moon phases [citation:12].", 
      episode: 2, 
      date: getDate(7),
      audioUrl: ""
    },
    { 
      title: "Remote Work & Time", 
      description: "How time zones affect distributed teams and meeting scheduling [citation:11].", 
      episode: 3, 
      date: getDate(7),
      audioUrl: ""
    },
    { 
      title: "Timekeeping History", 
      description: "Stories from the history of clocks, calendars, and time standards [citation:1].", 
      episode: 4, 
      date: getDate(7),
      audioUrl: ""
    },
  ],
  monthly: [
    { 
      title: "The TimeGovern Monthly Review", 
      description: "30-minute deep dive into all time-related topics and updates [citation:1].", 
      episode: 1, 
      date: getDate(30),
      audioUrl: ""
    },
    { 
      title: "Astronomy Deep Dive", 
      description: "Full-length episode exploring monthly astronomical events like the Black Moon [citation:2].", 
      episode: 2, 
      date: getDate(30),
      audioUrl: ""
    },
    { 
      title: "Global Time Laws", 
      description: "Legal changes affecting time zones and data privacy across the world [citation:12].", 
      episode: 3, 
      date: getDate(30),
      audioUrl: ""
    },
    { 
      title: "Premium Member Q&A", 
      description: "Answering questions from our premium community about tools and features [citation:11].", 
      episode: 4, 
      date: getDate(30),
      audioUrl: ""
    },
  ],
}
