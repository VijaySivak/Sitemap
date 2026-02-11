Visual Details: (DO NOT SKIP. MAINTAIN THIS THROUGHOUT ALL PAGES OF THE SITE)
 - Pages should contain styles that look similar to apple with a very modern and smooth design. 
 - Colors should be adapted from the Toyota Financial website. 
 - The visual details should be stored in a Widget-like asthetic such that a widget can contain multiple components but should be all a similar size as other widgets. Sizing must be consistent. 
   - Expanding on the visual details of the widgets, it should be simple to remove and add widgets to the page, ensuring that all widgets have the same size, shape, and style. 
 - All widgets and components that include any sort of data, whether it is numeric or text, should indicate how the data is being displayed. This can be done by including a small tooltip that highlights whether the data is Hardcoded, from a JSON, SQLITE file, or knowledge graph. If it is a knowledge graph, it will not need a tooltip. Any other data must indicate the type. This tooltip should be a very minimal design that alights with the rest of the visual designs and not obstruct content in any way at all. 


Directory Structure: (DO NOT SKIP. MAINTAIN THIS THROUGHOUT ALL PAGES OF THE SITE)
 - Pages should be stored seperate such that each page is it's own directory with it's own assets and other content
 - Components of the page such as widgets and assets that are shared among pages should be stored in a shared directory and labeled at the top of the page with comments as to where they are being used. 
 - Modular Directory structure should be maintained throughout the project to ensure that the code is easy to navigate and understand. 
 - All pages should be stored in UI_Dashboard directory. There should be no link to other directories. This includes all the data being copied and pasted to this directory as well. 

Sample Pages: (DO NOT SKIP. ALL THE SAMPLE PAGERS ARE STORED IN DIFFERENT DIRECTORIES. THEY WILL NEED TO BE COPIED AND ADAPTED TO THE CURRENT UI_DASHBOARD DIRECTORY WITH ALL VISUAL AND DIRECTORY CHANGES IMPLEMENTED. YOU SHOULD HAVE ALL THE SAME CONTENT BUT WITH THE NEW VISUAL DETAILS AND DIRECTORY STRUCTURE)
 - Parent Dashboard will be adapted from TFS/CX_Insights/UI_Dashboard/tfs_storyboard_v4.html
 - FAQ related pages will be a seperate area that can be accessed from the dashboard. The code from this is currently stored in TFS/CX_Insights/Data_Extraction/Cooking/Sitemap_CX/dashboard-ui/ and TFS/CX_Insights/UI_Dashboard/Temporary_test/
   - Organization of this FAQ will be as follows: 
     - This FAQ related pages can be accessed by clicking on the FAQ Insights button in the parent dashboard. 
     - This will then show the details from the Sitemap_CX directory such that both of the pages that are currently stored within that version of the website will be combined into one page with all components of the first page as well as the "Business Metrics" page will be on the same page. This will serve as the dashboard for the FAQ related page. 
     - The rest of the sections in the FAQ insights will be taken from the other temporary_test directory. 


Tech Stack Plans:
 - Use lightweight ReactJS to create the main website
 - Avoid using backend as much as possible

Implementation Plan:
- Start off by creating the main parent dashboard page converted into the style of Apple with Toyota Financial colors as per the visual plans. 
- Import all of the other pages from the two directories and convert them into the styling as desired. 