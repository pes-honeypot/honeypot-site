function detectAdblock(callback) {
    const bait = document.createElement('div');
    bait.className = 'adsbox';
    bait.style.position = 'absolute';
    bait.style.height = '1px';
    bait.style.top = '-1000px';
    document.body.appendChild(bait);
    setTimeout(() => {
      const blocked = bait.offsetHeight === 0;
      bait.remove();
      callback(blocked);
    }, 100);
}
  