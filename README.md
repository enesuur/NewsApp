# News Portal Project

This project is a news portal integrated with Firebase Firestore, allowing users to browse the latest news, filter by categories, and access detailed news articles. It features a clean and responsive UI built with **Tamagui**.

### UI Design

The project features a responsive user interface built with **Tamagui**, ensuring compatibility across a wide range of devices, from mobile to desktop.

<div style="display: flex; justify-content: space-between;">

  <div style="flex: 1; text-align: center;">
    <a href="https://hizliresim.com/lornkct" target="_blank">
      <img src="https://i.hizliresim.com/lornkct.png" alt="Image 1" style="max-width: 100%; height: auto;">
    </a>
  </div>

  <div style="flex: 1; text-align: center;">
    <a href="https://hizliresim.com/i1m7yrl" target="_blank">
      <img src="https://i.hizliresim.com/i1m7yrl.png" alt="Image 2" style="max-width: 100%; height: auto;">
    </a>
  </div>

  <div style="flex: 1; text-align: center;">
    <a href="https://hizliresim.com/4rr9lxz" target="_blank">
      <img src="https://i.hizliresim.com/4rr9lxz.png" alt="Image 3" style="max-width: 100%; height: auto;">
    </a>
  </div>

</div>
## Features

### News Data

Each news item contains the following information:

- **Title**: A short text representing the news headline.
- **Description**: A detailed description of the news.
- **Category**: The category the news belongs to (e.g., Sports, Technology, Economy).
- **Date**: The publication date of the news.
- **Image**: A URL link to the news image.

### Firebase Firestore Integration

- The news items are stored in a collection using **Firestore**.
- Each item includes the information outlined above.
- At least 5 sample news items have been added, each with different categories and dates.

### Homepage (News List)

The homepage displays a list of news articles, sorted with the latest news at the top. The list shows the following:

- **Title**
- **Date**
- **Image**

In addition, users can filter the news:

- **Filter by Category**: Users can filter news by selecting a category by clicking buttons.
- **Filter by Date**: Users can filter news by datepicker.

### Detail Page

When a user clicks on a news item on the homepage, they are redirected to a detailed view of the news article. The following information is displayed:

- **Title**
- **Image**
- **Description**
- **Date**

## Addinitional Feature

- **Pagination**: To enhance navigation through the news list, pagination implemented.
- **Image Caching**: For better performance, image caching is planned, allowing faster load times for news images.


## Technologies

- **React Native Expo**: For building the user interface.
- **Firebase DB**: For storing and managing the news data.
- **Tamagui**: For creating a sleek and responsive UI.
- **Typescript**: As programming language.
- 
## Conclusion

This project is a user-friendly news portal with a responsive design, allowing users to quickly access the latest news. Features such as category and date filtering, a detailed news page, infinite scroll, and image caching provide a seamless and efficient user experience.
