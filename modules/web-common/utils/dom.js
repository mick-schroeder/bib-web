export const scrollIntoViewIfNeeded = (element, container, opts = {}) => {
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    const elementTop = element.offsetTop;
    const elementBottom = elementTop + element.clientHeight;

    if (elementTop < containerTop || elementBottom > containerBottom) {
        const before = container.scrollTop;
        element.scrollIntoView(opts);
        const after = container.scrollTop;
        return after - before;
    }
    return 0;
}

export const getScrollbarWidth = () => {
	if (process.env.NODE_ENV === 'test') {
		return 0;
	}
	const scrollDiv = document.createElement('div');
	scrollDiv.style.position = 'absolute';
	scrollDiv.style.top = '-9999px';
	scrollDiv.style.width = '50px';
	scrollDiv.style.height = '50px';
	scrollDiv.style.overflow = 'scroll';
	document.body.appendChild(scrollDiv);
	const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);

	return scrollbarWidth;
}
