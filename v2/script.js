// Theme + font + gradient-colour controls. All choices persist in localStorage.
(function () {
    var root = document.documentElement;

    /* Curated gradient palettes — only theme-appropriate colours are offered,
       so the text (light-on-dark / dark-on-light) always stays readable. */
    var PALETTES = {
        dark: [
            { name: "Midnight", value: "#0f172a" },
            { name: "Indigo", value: "#1e1b4b" },
            { name: "Violet", value: "#312e81" },
            { name: "Ocean", value: "#0c4a6e" },
            { name: "Forest", value: "#064e3b" },
            { name: "Wine", value: "#4a044e" },
            { name: "Charcoal", value: "#18181b" }
        ],
        light: [
            { name: "Sky", value: "#e0f2fe" },
            { name: "Lavender", value: "#e0e7ff" },
            { name: "Blush", value: "#fae8ff" },
            { name: "Mint", value: "#dcfce7" },
            { name: "Cream", value: "#fef9c3" },
            { name: "Peach", value: "#ffedd5" },
            { name: "Cloud", value: "#f1f5f9" }
        ]
    };
    var DEFAULTS = {
        dark: ["#0f172a", "#312e81"],
        light: ["#e0e7ff", "#fae8ff"]
    };

    var color1 = document.getElementById("color1-select");
    var color2 = document.getElementById("color2-select");

    function theme() {
        return root.classList.contains("light") ? "light" : "dark";
    }

    function applyGradient(c1, c2) {
        root.style.setProperty("--c1", c1);
        root.style.setProperty("--c2", c2);
    }

    function fillOptions(select, palette, selected) {
        select.innerHTML = "";
        palette.forEach(function (c) {
            var opt = document.createElement("option");
            opt.value = c.value;
            opt.textContent = c.name;
            if (c.value === selected) opt.selected = true;
            select.appendChild(opt);
        });
    }

    // Populate both colour pickers for the active theme and apply the gradient.
    function loadColorsForTheme() {
        var t = theme();
        var palette = PALETTES[t];
        var values = palette.map(function (c) { return c.value; });

        var c1 = localStorage.getItem("grad-" + t + "-1") || DEFAULTS[t][0];
        var c2 = localStorage.getItem("grad-" + t + "-2") || DEFAULTS[t][1];
        if (values.indexOf(c1) === -1) c1 = DEFAULTS[t][0];
        if (values.indexOf(c2) === -1) c2 = DEFAULTS[t][1];

        fillOptions(color1, palette, c1);
        fillOptions(color2, palette, c2);
        applyGradient(c1, c2);
    }

    /* ---- Theme ---- */
    if (localStorage.getItem("theme") === "light") {
        root.classList.add("light");
    }

    /* ---- Font ---- */
    var fontSelect = document.getElementById("font-select");
    var savedFont = localStorage.getItem("font");
    if (savedFont) {
        root.style.setProperty("--font-family", savedFont);
        fontSelect.value = savedFont;
    }
    fontSelect.addEventListener("change", function () {
        root.style.setProperty("--font-family", fontSelect.value);
        localStorage.setItem("font", fontSelect.value);
    });

    /* ---- Gradient colours ---- */
    loadColorsForTheme();
    color1.addEventListener("change", function () {
        applyGradient(color1.value, color2.value);
        localStorage.setItem("grad-" + theme() + "-1", color1.value);
    });
    color2.addEventListener("change", function () {
        applyGradient(color1.value, color2.value);
        localStorage.setItem("grad-" + theme() + "-2", color2.value);
    });

    /* ---- Theme toggle (swaps the colour palette too) ---- */
    document.getElementById("theme-toggle").addEventListener("click", function () {
        var isLight = root.classList.toggle("light");
        localStorage.setItem("theme", isLight ? "light" : "dark");
        loadColorsForTheme();
    });
})();
