/* global ol */

import Ember from 'ember';

export default Ember.Component.extend({
    
    tagName: 'div',
    _map: undefined,

    init() {
        this._super(...arguments);
        this._boundDestroyMap = Ember.run.bind(this, this._destroyMap);
    },

    didInsertElement() {
        this._super(...arguments);

        Ember.$(window).on('unload', this._boundDestroyMap);

        const features = this._createFeatures();

        const source = new ol.source.Vector({ features });

        const layer = new ol.layer.Vector({ source });

        const view = new ol.View();

        const map = new ol.Map({
            layers: [layer],
            target: this.elementId,
            controls: [],
            interactions: [],
            view
        });

        view.fit(source.getExtent(), map.getSize());

        this._map = map;
    },

    willDestroyElement() {
        this._destroyMap();
        if (this._boundDestroyMap) {
            Ember.$(window).off('unload', this._boundDestroyMap);
        }

        this._super(...arguments);
    },

    _destroyMap() {
        if (this._map) {
            this._map.setTarget(null);
            this._map = null;
            console.log("Destroyed map!");
        }
    },

    _createFeatures() {
        const features = [];
        for (let x = 0; x < 200; x++) {
            for (let y = 0; y < 120; y++) {
                const coordinates = [
                    [x, y],
                    [x + 0.6, y + 0.6]
                ];
                features.push(new ol.Feature({
                    geometry: new ol.geom.LineString(coordinates, 'XY')
                }));
            }
        }
        return features;
    }
});
