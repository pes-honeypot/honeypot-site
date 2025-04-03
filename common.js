function detectAdblock(callback) {
    let detected = false;

    const check1 = () => {
        const bait = document.createElement('div');
        bait.className = 'ads ad-banner sponsored';
        bait.style.position = 'absolute';
        bait.style.top = '-1000px';
        bait.innerHTML = '&nbsp;';
        document.body.appendChild(bait);
        setTimeout(() => {
        if (bait.offsetHeight === 0 || bait.offsetParent === null) detected = true;
        bait.remove();
        finalize();
        }, 100);
    };

    const check2 = () => {
        const testScript = document.createElement('script');
        testScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        testScript.onerror = () => { detected = true; finalize(); };
        testScript.onload = () => finalize();
        document.body.appendChild(testScript);
    };

    let checksDone = 0;
    function finalize() {
        checksDone++;
        if (checksDone === 2) callback(detected);
    }

    check1();
    check2();
}

// detectAdblock((isBlocked) => {
// console.log("Adblock Detected?", isBlocked);
// document.body.insertAdjacentHTML("beforeend", `<p>${isBlocked ? "Adblock ON" : "Adblock OFF"}</p>`);
// });
