# qiao-regedit

## api

### addValue

```javascript
'use strict';

var q = require('qiao-regedit');

var test = function () {
  // var key = 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
  var key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
  var obj = {
    key: key,
    name: 'test',
    data: 'haha',
  };

  q.addValue(obj, function (res) {
    console.log(res);
  });
};

test();
```

### addValueSync

```javascript
'use strict';

var q = require('qiao-regedit');

var test = async function () {
  try {
    // var key = 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
    var key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
    var obj = {
      key: key,
      name: 'test',
      data: 'haha',
    };

    var res = await q.addValueSync(obj);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

test();
```

### delValue

```javascript
'use strict';

var q = require('qiao-regedit');

var test = function () {
  // var key = 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
  var key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
  var obj = {
    key: key,
    name: 'test',
  };

  q.delValue(obj, function (res) {
    console.log(res);
  });
};

test();
```

### delValueSync

```javascript
'use strict';

var q = require('qiao-regedit');

var test = async function () {
  try {
    // var key = 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
    var key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
    var obj = {
      key: key,
      name: 'test',
    };

    var res = await q.delValueSync(obj);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

test();
```

### listValues

```javascript
'use strict';

var q = require('qiao-regedit');

var test = function () {
  // var key = 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
  var key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';

  q.listValues(key, function (err, res) {
    console.log(err, res);
  });
};

test();
```

### listValuesSync

```javascript
'use strict';

var q = require('qiao-regedit');

var test = async function () {
  try {
    // var key = 'HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
    var key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';

    var res = await q.listValuesSync(key);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

test();
```
