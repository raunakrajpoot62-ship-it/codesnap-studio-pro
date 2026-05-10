/* =========================================
   CODESNAP STUDIO PRO
========================================= */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const codeInput =
      document.getElementById(
        "codeInput"
      );

    const codePreview =
      document.getElementById(
        "codePreview"
      );

    const languageSelect =
      document.getElementById(
        "languageSelect"
      );

    const themeSelect =
      document.getElementById(
        "themeSelect"
      );

    const exportBtn =
      document.getElementById(
        "exportBtn"
      );

    const copyBtn =
      document.getElementById(
        "copyBtn"
      );

    const templateBtn =
      document.getElementById(
        "templateBtn"
      );

    const lineNumbers =
      document.getElementById(
        "lineNumbers"
      );

    const previewCard =
      document.getElementById(
        "previewCard"
      );

    const lineCount =
      document.getElementById(
        "lineCount"
      );

    const charCount =
      document.getElementById(
        "charCount"
      );

    /* =========================================
       CODE TEMPLATES
    ========================================= */

    const templates = {

      javascript:
`function welcome(){

  console.log(
    "Welcome to CodeSnap Studio 🚀"
  );

}

welcome();`,

      html:
`<div class="card">

  <h1>
    Hello World
  </h1>

</div>`,

      css:
`body{

  background:black;
  color:white;

}`,

      python:
`def greet():

    print(
        "Hello World 🚀"
    )

greet()`

    };

    /* =========================================
       INITIALIZE
    ========================================= */

    initialize();

    /* =========================================
       EVENTS
    ========================================= */

    codeInput.addEventListener(
      "input",
      handleEditorUpdate
    );

    codeInput.addEventListener(
      "scroll",
      syncScroll
    );

    languageSelect.addEventListener(
      "change",
      changeLanguage
    );

    themeSelect.addEventListener(
      "change",
      applyTheme
    );

    exportBtn.addEventListener(
      "click",
      exportPNG
    );

    copyBtn.addEventListener(
      "click",
      copyCode
    );

    templateBtn.addEventListener(
      "click",
      randomTemplate
    );

    /* =========================================
       KEYBOARD SHORTCUTS
    ========================================= */

    document.addEventListener(
      "keydown",
      (event) => {

        /* CTRL + S */

        if(
          event.ctrlKey &&
          event.key.toLowerCase() === "s"
        ){

          event.preventDefault();

          exportPNG();

        }

        /* TAB SUPPORT */

        if(
          event.key === "Tab" &&
          document.activeElement === codeInput
        ){

          event.preventDefault();

          insertTab();

        }

      }
    );

    /* =========================================
       INITIALIZE APP
    ========================================= */

    function initialize(){

      updateLanguage();

      updatePreview();

      updateLineNumbers();

      updateStats();

      applyTheme();

    }

    /* =========================================
       HANDLE EDITOR UPDATE
    ========================================= */

    function handleEditorUpdate(){

      updatePreview();

      updateLineNumbers();

      updateStats();

      autoResize();

    }

    /* =========================================
       UPDATE PREVIEW
    ========================================= */

    function updatePreview(){

      codePreview.textContent =
        codeInput.value;

      Prism.highlightElement(
        codePreview
      );

    }

    /* =========================================
       UPDATE LANGUAGE
    ========================================= */

    function updateLanguage(){

      const language =
        languageSelect.value;

      codePreview.className =
        "";

      codePreview.classList.add(
        "language-" + language
      );

    }

    /* =========================================
       CHANGE LANGUAGE
    ========================================= */

    function changeLanguage(){

      updateLanguage();

      loadTemplate();

      updatePreview();

    }

    /* =========================================
       APPLY THEME
    ========================================= */

    function applyTheme(){

      document.body.classList.remove(
        "glass",
        "amoled"
      );

      const theme =
        themeSelect.value;

      if(theme !== "neon"){

        document.body.classList.add(
          theme
        );

      }

    }

    /* =========================================
       LINE NUMBERS
    ========================================= */

    function updateLineNumbers(){

      const lines =
        codeInput.value
        .split("\n")
        .length;

      let numbers = "";

      for(
        let i = 1;
        i <= lines;
        i++
      ){

        numbers += i + "<br>";

      }

      lineNumbers.innerHTML =
        numbers;

    }

    /* =========================================
       LIVE STATS
    ========================================= */

    function updateStats(){

      const text =
        codeInput.value;

      lineCount.textContent =
        text.split("\n").length;

      charCount.textContent =
        text.length;

    }

    /* =========================================
       COPY CODE
    ========================================= */

    function copyCode(){

      navigator.clipboard.writeText(
        codeInput.value
      ).then(() => {

        const oldHTML =
          copyBtn.innerHTML;

        copyBtn.innerHTML =
          `
          <i class="fa-solid fa-check"></i>
          Copied
          `;

        setTimeout(() => {

          copyBtn.innerHTML =
            oldHTML;

        },1500);

      }).catch(() => {

        alert(
          "Clipboard access failed."
        );

      });

    }

    /* =========================================
       EXPORT PNG
    ========================================= */

    function exportPNG(){

      exportBtn.disabled = true;

      exportBtn.innerHTML =
        `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Exporting
        `;

      html2canvas(
        previewCard,
        {
          backgroundColor:null,
          scale:2
        }
      ).then(canvas => {

        const link =
          document.createElement(
            "a"
          );

        link.download =
          "codesnap-" +
          Date.now() +
          ".png";

        link.href =
          canvas.toDataURL(
            "image/png"
          );

        link.click();

        exportBtn.disabled = false;

        exportBtn.innerHTML =
          `
          <i class="fa-solid fa-download"></i>
          Export
          `;

      }).catch(() => {

        exportBtn.disabled = false;

        exportBtn.innerHTML =
          `
          <i class="fa-solid fa-download"></i>
          Export
          `;

        alert(
          "Export failed."
        );

      });

    }

    /* =========================================
       RANDOM TEMPLATE
    ========================================= */

    function randomTemplate(){

      const keys =
        Object.keys(
          templates
        );

      const randomKey =
        keys[
          Math.floor(
            Math.random() *
            keys.length
          )
        ];

      languageSelect.value =
        randomKey;

      updateLanguage();

      codeInput.value =
        templates[randomKey];

      handleEditorUpdate();

    }

    /* =========================================
       LOAD TEMPLATE
    ========================================= */

    function loadTemplate(){

      const language =
        languageSelect.value;

      codeInput.value =
        templates[language];

      handleEditorUpdate();

    }

    /* =========================================
       INSERT TAB
    ========================================= */

    function insertTab(){

      const start =
        codeInput.selectionStart;

      const end =
        codeInput.selectionEnd;

      codeInput.value =
        codeInput.value.substring(
          0,
          start
        ) +
        "  " +
        codeInput.value.substring(
          end
        );

      codeInput.selectionStart =
        codeInput.selectionEnd =
        start + 2;

      handleEditorUpdate();

    }

    /* =========================================
       AUTO RESIZE
    ========================================= */

    function autoResize(){

      codeInput.style.height =
        "auto";

      codeInput.style.height =
        codeInput.scrollHeight +
        "px";

    }

    /* =========================================
       SCROLL SYNC
    ========================================= */

    function syncScroll(){

      lineNumbers.scrollTop =
        codeInput.scrollTop;

    }

  }
);
