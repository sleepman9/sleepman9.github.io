document.addEventListener('DOMContentLoaded', () => {
    const toc = document.querySelector('.widget--toc #TableOfContents');
    if (!toc) return;

    const listItems = toc.querySelectorAll('li');
    
    listItems.forEach((li) => {
        const subList = li.querySelector('ul, ol');
        if (subList) {
            li.classList.add('has-children');
            
            // 创建折叠按钮
            const expander = document.createElement('span');
            expander.className = 'toc-expander';
            expander.innerText = '▶'; 
            
            // 将按钮插入到链接之前
            const link = li.querySelector('a');
            if (link) {
                li.insertBefore(expander, link);
            } else {
                li.prepend(expander);
            }

            // 点击事件处理
            expander.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const expanded = li.classList.toggle('expanded');
                expander.style.transform = expanded ? 'rotate(90deg)' : 'rotate(0deg)';
            });
        }
    });
    
    // 如果当前 URL 包含锚点，自动展开对应的父级
    if (window.location.hash) {
        const hash = decodeURIComponent(window.location.hash);
        const targetLink = toc.querySelector(`a[href="${window.location.hash}"]`) || toc.querySelector(`a[href="${hash}"]`);
        
        if (targetLink) {
             let parent = targetLink.parentElement;
             while (parent && parent !== toc) {
                 if (parent.tagName === 'LI' && parent.classList.contains('has-children')) {
                     parent.classList.add('expanded');
                     const exp = parent.querySelector('.toc-expander') as HTMLElement;
                     if (exp) exp.style.transform = 'rotate(90deg)';
                 }
                 parent = parent.parentElement;
             }
        }
    }
});