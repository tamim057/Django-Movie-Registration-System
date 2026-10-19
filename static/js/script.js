document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("appBox");
    const table = document.querySelector("table");
    const form = document.getElementById("movieForm");

    // 1. Subtle 3D tilt that follows the mouse (desktop only)
    if (box && window.matchMedia("(hover: hover) and (min-width: 951px)").matches) {
        document.addEventListener("mousemove", e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            box.style.transform = `rotateY(${x * 2}deg) rotateX(${-y * 2}deg)`;
        });
        document.addEventListener("mouseleave", () => {
            box.style.transform = "rotateY(0) rotateX(0)";
        });
    }

    // 2. Table features (register page only)
    if (table) {
        const tbody = table.querySelector("tbody");
        const headers = table.querySelectorAll("thead th");
        const isDataRow = row => row.children.length >= 5;

        // Format budget + staggered row animation
        tbody.querySelectorAll("tr").forEach((row, i) => {
            row.style.animationDelay = `${i * 0.05}s`;
            if (!isDataRow(row)) return;
            const cell = row.children[3];
            const raw = cell.textContent.trim().replace(/,/g, "");
            if (raw !== "" && !isNaN(raw)) cell.textContent = "$" + Number(raw).toLocaleString();
        });

        // Click header to sort (Actions column excluded)
        headers.forEach((th, colIndex) => {
            if (th.classList.contains("no-sort")) return;
            th.addEventListener("click", () => {
                const rows = Array.from(tbody.querySelectorAll("tr")).filter(isDataRow);
                if (!rows.length) return;

                const asc = !th.classList.contains("asc");
                headers.forEach(h => h.classList.remove("asc", "desc"));
                th.classList.add(asc ? "asc" : "desc");

                const getValue = row => {
                    const text = row.children[colIndex].textContent.trim();
                    const num = parseFloat(text.replace(/[$,]/g, ""));
                    return isNaN(num) ? text.toLowerCase() : num;
                };

                rows.sort((a, b) => {
                    const x = getValue(a), y = getValue(b);
                    return x < y ? (asc ? -1 : 1) : x > y ? (asc ? 1 : -1) : 0;
                });
                rows.forEach(r => tbody.appendChild(r));
            });
        });
    }

    // 3. Confirm before deleting
    document.querySelectorAll(".delete-form").forEach(f => {
        f.addEventListener("submit", e => {
            if (!confirm("Delete this movie?")) e.preventDefault();
        });
    });

    // 4. Prevent double submit
    if (form) {
        const submitBtn = form.querySelector("button[type='submit']");
        form.addEventListener("submit", () => {
            submitBtn.disabled = true;
            submitBtn.textContent = "Saving...";
        });
    }
});