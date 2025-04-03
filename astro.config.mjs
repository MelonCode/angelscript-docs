// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://angelscript.hazelight.se",
  integrations: [
    starlight({
      title: "Unreal Engine Angelscript",
      social: {
        github: "https://github.com/Hazelight/UnrealEngine-Angelscript",
        discord: "https://discord.gg/unreal-angelscript",
      },
      sidebar: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Getting Started",
          items: [
            { label: "Installation", link: "/getting-started/installation/" },
            {
              label: "Scripting Introduction",
              link: "/getting-started/introduction/",
            },
          ],
        },
        {
          label: "Script Features",
          items: [
            {
              label: "Functions and BlueprintEvents",
              link: "/scripting/functions-and-events/",
            },
            {
              label: "Properties and Accessors",
              link: "/scripting/properties-and-accessors/",
            },
            {
              label: "Actors and Components",
              link: "/scripting/actors-components/",
            },
            {
              label: "Function Libraries",
              link: "/scripting/function-libraries/",
            },
            { label: "FName Literals", link: "/scripting/fname-literals/" },
            { label: "Formatted Strings", link: "/scripting/format-strings/" },
            {
              label: "Structs and References",
              link: "/scripting/structs-refs/",
            },
            {
              label: "Networking Features",
              link: "/scripting/networking-features/",
            },
            { label: "Delegates and Events", link: "/scripting/delegates/" },
            { label: "Mixin Methods", link: "/scripting/mixin-methods/" },
            { label: "Gameplay Tags", link: "/scripting/gameplaytags/" },
            { label: "Editor-Only Script", link: "/scripting/editor-script/" },
            { label: "Subsystems", link: "/scripting/subsystems/" },
            { label: "Script Tests", link: "/scripting/script-tests/" },
            {
              label: "Differences with Unreal C++",
              link: "/scripting/cpp-differences/",
            },
          ],
        },
        {
          label: "C++ Usage and Bindings",
          items: [
            {
              label: "Automatic Bindings",
              link: "/cpp-bindings/automatic-bindings/",
            },
            {
              label: "Script Mixin Libraries",
              link: "/cpp-bindings/script-mixin-libraries/",
            },
            {
              label: "Using Precompiled Scripts",
              link: "/cpp-bindings/using-precompiled-scripts/",
            },
          ],
        },
        {
          label: "UE-AS Development",
          items: [
            {
              label: "Development Status",
              link: "/project/development-status/",
            },
            { label: "Resources and Links", link: "/project/resources/" },
            { label: "License", link: "/project/license/" },
          ],
        },
        {
          label: "External Resources",
          items: [
            {
              label: "Script API Reference",
              link: "https://angelscript.hazelight.se/api/",
            },
            {
              label: "Original Documentation",
              link: "https://angelscript.hazelight.se/",
            },
            {
              label: "Source Repository",
              link: "https://github.com/Hazelight/Docs-UnrealEngine-Angelscript",
            },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
      head: [
        {
          tag: "script",
          content: `
            document.addEventListener('DOMContentLoaded', () => {
              // Find the right sidebar (table of contents)
              const sidebar = document.querySelector('.right-sidebar');
              
              if (!sidebar) return;
              
              // Add click event to the sidebar toggle button
              sidebar.addEventListener('click', (e) => {
                // Check if the click was on the toggle button (::before element)
                const rect = sidebar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;
                
                // If the click was in the top-right corner (where our toggle button is)
                if (clickX > rect.width - 30 && clickY < 30) {
                  document.body.classList.toggle('toc-collapsed');
                }
              });
              
              // Add keydown event for Escape key to expand the sidebar
              document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && document.body.classList.contains('toc-collapsed')) {
                  document.body.classList.remove('toc-collapsed');
                }
              });
            });
          `,
        },
      ],
    }),
  ],
});
