if ('HTMLPortalElement' in window) {

    let timeout;

    document.addEventListener('mouseenter', e => {
        if (e.target.matches && e.target.matches('a[href]')) {
            const url = e.target.href;
            if (url === location.href) {
                return;
            }

            let portal = document.querySelector('portal#link-preview-portal');

            if (portal) {
                clearTimeout(timeout);
                if (portal.src !== url) {
                    portal.src = url;
                }
            } else {
                portal = document.createElement('portal');
                portal.src = e.target.href;
                portal.id = 'link-preview-portal';

                document.body.appendChild(portal);
            }
        }
    }, {capture: true});

    document.addEventListener('mouseleave', e => {
        if (e.target.matches && e.target.matches('a[href]')) {
            const portal = document.querySelector('portal#link-preview-portal');

            if (portal) {
                timeout = setTimeout(() => portal.remove(), 300);
            }
        }
    }, {capture: true});

    document.addEventListener('click', e => {
        const link = e.target && e.target.closest('a[href]');
        const portal = document.querySelector('portal#link-preview-portal');

        if (link && portal && portal.src === link.href) {
            e.preventDefault();
            portal.classList.add('activated');

            portal.addEventListener('transitionend', e => {
                if (e.propertyName === 'transform') {
                    portal.activate();
                }
            }, {once: true});
        }
    }, {capture: true});


}
