// Beta 1.0.0
// 4月27日 15:33

// Base args
var db = storages.create("王者_view");
if (!db.contains("ox")) db.put("ox", -64);
if (!db.contains("oy")) db.put("oy", 0);

var path = "/sdcard/data.log";
var file, data, L, v1, v2, v3, v4, v5;
var size = 88,
    fps = 100,
    ie = 0,
    ox = db.get("ox"),
    oy = db.get("oy");

var dw = device.width,
    dh = device.height;
var note = "王者-View";
var info = floaty.window( // show some information at header
    <frame w="150" h="40">
        <text id="text" color="#FFFF00" />
        <button id="t" w="30" h="30" padding="0" margin="10 0 0 -3">上</button>
        <button id="b" w="30" h="30" padding="0" margin="10 0 0 24">下</button>
        <button id="l" w="30" h="30" padding="0" margin="10 0 0 51">左</button>
        <button id="r" w="30" h="30" padding="0" margin="10 0 0 78">右</button>
        <button id="h" w="34" h="30" padding="0" margin="10 0 0 106">隐藏</button>
    </frame>
);
info.setPosition(dw / 1.5 + 100, 0);
info.text.setText(note);
info.t.click(() => {
    oy -= 2
    db.put("oy", oy)
});
info.b.click(() => {
    oy += 2
    db.put("oy", oy)
});
info.l.click(() => {
    ox -= 2
    db.put("ox", ox)
});
info.r.click(() => {
    ox += 2
    db.put("ox", ox)
});
info.h.click(() => {
    info.setPosition(-1000, 0);
});

// addDot
v1 = floaty.window(<frame background="#32CD32"><text padding="-3 1" size="12sp" color="#FFFFFF" text="1" /></frame>);
v1.setSize(size, size);

v2 = floaty.window(<frame background="#00FFFF"><text padding="-3 1" size="12sp" color="#FFFFFF" text="2" /></frame>);
v2.setSize(size, size);

v3 = floaty.window(<frame background="#00FF00"><text padding="-3 1" size="12sp" color="#FFFFFF" text="3" /></frame>);
v3.setSize(size, size);

v4 = floaty.window(<frame background="#9932CC"><text padding="-3 1" size="12sp" color="#FFFFFF" text="4" /></frame>);
v4.setSize(size, size);

v5 = floaty.window(<frame background="#FFFF00"><text padding="-3 1" size="12sp" color="#FFFFFF" text="5" /></frame>);
v5.setSize(size, size);

// hide dot at begin
v1.setPosition(-1000, 0);
v2.setPosition(-1000, 0);
v3.setPosition(-1000, 0);
v4.setPosition(-1000, 0);
v5.setPosition(-1000, 0);

// main
setInterval(() => {
    if (files.exists(path)) {
        file = open(path);
        data = file.read();
        L = data.split("_");
        file.close();
        if (L && L.length > 1) {
            v1.setPosition(Number(L[1]) + ox, Number(L[0]) + oy);
        }
        if (L && L.length > 3) {
            v2.setPosition(Number(L[3]) + ox, Number(L[2]) + oy);
        }
        if (L && L.length > 5) {
            v3.setPosition(Number(L[5]) + ox, Number(L[4]) + oy);
        }
        if (L && L.length > 7) {
            v4.setPosition(Number(L[7]) + ox, Number(L[6]) + oy);
        }
        if (L && L.length > 9) {
            v5.setPosition(Number(L[9]) + ox, Number(L[8]) + oy);
        }
    }
}, fps);