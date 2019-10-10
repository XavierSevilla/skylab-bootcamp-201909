describe ('Hooray.prototyoe.unshift', function () {

    it('should add the sent item at beginning of the array', function () {
        var hooray = new Hooray (2,4,6);
        hooray.unshift(1);
        
        var test = new Hooray (1,2,4,6);
        for (var i=0; i<hooray.length; i++) {
            expect(hooray[i]).toBe(test[i]);
        }
    });

    it('should add all items sent at beginning of the array', function () {
        var hooray = new Hooray (4,5);
        hooray.unshift(1,2,3);
        
        var test = new Hooray (1,2,3,4,5);
        for (var i=0; i<hooray.length; i++) {
            expect(hooray[i]).toBe(test[i]);
        }
    });

    it('should increase length of array as some items sent', function () {
        var hooray = [2,4,6];

        expect(hooray.unshift(1,2,3)).toBe(6);
    });

    it('should succesfully add item/s sent on an empty array is sent', function () {
        var hooray = new Hooray ();

        expect(hooray.unshift(1,2,3)).toBe(3);

        var test = new Hooray (1,2,3);
        for (var i=0; i<hooray.length; i++) {
            expect(hooray[i]).toBe(test[i]);
        }
    })

});