describe("titleCase", function() {
    var $filter;
    var filter;

    beforeEach(function() {
        module('frontcamp16.components');
        inject(function($injector) {
            $filter = $injector.get('$filter');
            filter = $filter('titleCase');
        });
    });

    it("Should return undefined when undefined is passed in", function() {
        expect(filter(undefined)).toBeUndefined();
    });

    it("Should return null when null is passed in", function() {
        expect(filter(null)).toBeNull();
    });

    it("Should return a blank string when a blank string is passed in", function() {
        expect(filter("")).toEqual("");
    });

    it("Should change the casing of a lower cased word", function() {
        expect(filter("george harrison")).toEqual("George Harrison");
    });

    it("Should change the casing of an upper cased word", function() {
        expect(filter("GEORGE BUSH")).toEqual("George Bush");
    });

    it("Should change the casing of random", function() {
        expect(filter("tHe roLLInG SToNes")).toEqual("The Rolling Stones");
    });

    it("Should play nice with a normal phrase", function() {
        expect(filter("Led Zeppeling")).toEqual("Led Zeppeling");
    });

});