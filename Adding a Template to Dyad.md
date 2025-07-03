Add Template

If you'd like to add a template to Dyad Hub, follow these steps.



Dyad includes a few official templates, but if you'd like to propose a new one, please follow the steps below:



1\. Create a GitHub repo

Start by creating a GitHub repository that will serve as your template. You can refer to the Next.js template repo as an example.



2\. Define AI\_RULES.md

AI\_RULES.md provides system instructions to the AI. A good rules file should describe the tech stack and architecture of the codebase.



If you import the template into Dyad, it will automatically generate an AI\_RULES.md for you. You can use the generated file or write your own from scratch.



3\. (Optional) Support Select UI to Edit

If you'd like to support Select UI to Edit—a powerful feature that lets users edit specific UI components—you’ll need to tag elements during the compilation step. (Note from jeff- the one creating templates: You MUST do this on every template) 



For React or Next.js templates, use one of the following:



Next.js Component Tagger

React/Vite Component Tagger

If you're using another tech stack, you'll need to create your own compilation transform. This can be complex, but remember—this step is optional. Your template will still work without this feature.



4\. Submit Your Template

Once your template is ready, submit it by creating a GitHub issue. We’ll review it and provide feedback before adding it to Dyad Hub.



Thanks for contributing!

