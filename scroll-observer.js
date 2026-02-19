/*
 * Scroll-observer op window + html + body
 * in-viewport: false / true / passed
 * Nederlandse comments
 */

document.addEventListener('DOMContentLoaded', function() {

    var article_paragraphs = document.querySelectorAll('article p');

    article_paragraphs.forEach(function(p) {

        if (p.getAttribute('data-spans-initialized') === '1') {
            return;
        }
        p.setAttribute('data-spans-initialized', '1');

        var walker = document.createTreeWalker(
            p,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (!node.textContent || !node.textContent.trim()) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (node.parentNode && node.parentNode.nodeName.toLowerCase() === 'script') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );

        var text_nodes = [];
        var current;
        while ((current = walker.nextNode())) {
            text_nodes.push(current);
        }

        text_nodes.forEach(function(node) {
            var text = node.textContent;
            var parts = text.match(/[^.!?]+[.!?]*\s*/g);
            if (!parts) {
                return;
            }

            var fragment = document.createDocumentFragment();

            parts.forEach(function(part) {
                if (!part || !part.trim()) {
                    return;
                }
                var span = document.createElement('span');
                span.textContent = part;
                fragment.appendChild(span);
            });

            if (fragment.childNodes.length) {
                node.parentNode.replaceChild(fragment, node);
            }
        });
    });

    var elems = document.querySelectorAll('div, ul, li, p, h1, h2, h3, h4, form, article p span');

    function checkInViewport() {

        var win_height = document.documentElement.clientHeight;

        var scroll_top =
            document.body.scrollTop ||
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            0;

        var scroll_bottom = scroll_top + win_height;

        elems.forEach(function(el) {
            var rect = el.getBoundingClientRect();
            var el_top = rect.top + scroll_top;
            var el_bottom = rect.bottom + scroll_top;

            var in_view = (el_bottom > scroll_top && el_top < scroll_bottom);
            var state = el.getAttribute('in-viewport');

            if (in_view) {
                if (state !== 'true') {
                    el.setAttribute('in-viewport', 'true');
                }
            } else {
                if (state === 'true') {
                    el.setAttribute('in-viewport', 'passed');
                } else if (!state) {
                    el.setAttribute('in-viewport', 'false');
                }
            }
        });
    }

    checkInViewport();

    window.addEventListener('scroll', checkInViewport, { passive: true });
    document.documentElement.addEventListener('scroll', checkInViewport, { passive: true });
    document.body.addEventListener('scroll', checkInViewport, { passive: true });

    window.addEventListener('resize', checkInViewport);

});
