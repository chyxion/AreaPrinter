/**
 * @describe: HTMl 区域打印，纯JS
 * @version 0.1
 * @date created: 7/23/2013 15:10:23 
 * @author chyxion
 * @support: chyxion@163.com
 * @date modified: 
 * @modified by: 
 * How to use:
 * Print Area: <div id="PrintArea"> ... html ... </div>
 * JavaScript: <script>
 *              new AreaPrinter('PrintArea').print();
 *      </script>
 */
/**
 * 调用方式，new AreaPrinter('PrintAreaID').print();
 *@param 打印区域id，
 */
function AreaPrinter(id) {
    this.id = id;
}
AreaPrinter.prototype = {
    get_head: function () {
        var h = '<head>',
            links = document.getElementsByTagName('link'),
            link,
            i;
        if (links.length) {
            for (i = 0; i < links.length; ++i) {
                link = links[i];
                if (link.rel && link.rel.toLowerCase() == 'stylesheet' && 
                    link.media && link.media.toLowerCase() == 'print') {
                        h += '<link type="text/css" rel="stylesheet" href="' + 
                        link.href + '" media="print">';
                    }
            }
        }
        return h + '</head>';
    },
    get_body: function () {
        var me = this,
            e = document.getElementById(me.id);
        return '<body onload="focus(); print();"><div id="'+ 
          (me.id) + '" class="' + (e.className || '') + 
          '" style="' + (e.style.cssText || '') + '">' + e.innerHTML + '</div></body>';
    },
    build_iframe: function () {
        var i;
        try {
            i = document.createElement('iframe');
            document.body.appendChild(i);
            i.style.cssText = 'border:0;position:absolute;width:0px;height:0px;left:0px;top:0px;';
            i.src = 'about:blank';
            i.doc = i.contentDocument ? i.contentDocument : 
                (i.contentWindow ? i.contentWindow.document : i.document);
        } catch (e) { 
            throw e + '. IFrames may not be supported in this browser.'; 
        }

        if (!i.doc) throw 'Cannot find document.';

        return i;
    },
    print: function () {
        var me = this,
            f = me.build_iframe();
        f.doc.open();
        f.doc.write('<!DOCTYPE html><html>' + me.get_head() + me.get_body() + '</html>');
        f.doc.close();
        f.parentNode.removeChild(f);
    }
};
