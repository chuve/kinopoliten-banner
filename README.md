# kinopoliten-banner
Use Case Examples
-------
### Autoinit ###
Add into &lt;head> tag

[Demo](http://chuve.github.io/kinopoliten-banner/demo/demo-autoinit.html)
```
<script src="http://chuve.github.io/kinopoliten-banner/kinopoliten_bnr/kinopoliten_bnr.js"></script>
<script>
    var kinopoliten_bnr = new window.KinopolitenBnr({
        staticPath: 'http://chuve.github.io/kinopoliten-banner/',
        classContainer: 'intercative-bnr',
        autoInit: true,
        canClose: true
    });
</script>
```
### Init by event ###
Add before &lt;/body> tag

[Demo](http://chuve.github.io/kinopoliten-banner/demo/demo-initbyevent.html)
```
<script src="http://chuve.github.io/kinopoliten-banner/kinopoliten_bnr/kinopoliten_bnr.js"></script>
<script>
    var kinopoliten_bnr = new window.KinopolitenBnr({
        staticPath: 'http://chuve.github.io/kinopoliten-banner/',
        classContainer: 'intercative-bnr',
        autoInit: false,
        canClose: true
    });

    var btn = document.getElementById('showbanner');
    btn.addEventListener('click', function() {
        kinopoliten_bnr.show();
    });
    btn.addEventListener('touchstart', function() {
        kinopoliten_bnr.show();
    });
</script>
```
