/** are you serious? */

( function ( root ) {
  var _ObjectMerge = function ( ) {
      var i = 0,
        result = arguments[i++],
        obj, k, v;
        while ( ( obj = arguments[i++] ) instanceof Object ) {
          for ( k in obj )
            if ( ( v = obj[k] ) != null )
              result[k] = obj[k];
        }
        return result;
    },
    Configuration = function ( emu, config ) {
      if ( ! ( this instanceof _Configuration ) )
        throw 'Call to Configuration as function not allowed';
      
      var _self = this,
        _emu = emu,
        _config = { },
        _devices = emu.devices,
        _interrupts = emu.interrupts,
        k, h, c;
      
      config = _ObjectMerge( { }, Configuration.Defaults, config );
      for ( k in config )
        if ( ( h = _devices[k] ) ) {
          if ( ( c = h.getter ) )
            this.__defineGetter__( k, c.bind( h ) );
          if ( ( c = h.setter ) )
            this.__defineSetter__( k, c.bind( h ) );
          h.config( config[k] );
        } else if ( ( h = _interrupts[k] ) ) {
          if ( ( c = h.getter ) )
            this.__defineGetter__( k, c.bind( h ) );
          if ( ( c = h.setter ) )
            this.__defineSetter__( k, c.bind( h ) );
          h.config( config[k] );
        } else if ( ( h = _Actions[k] ) ) {
          if ( ( c = h.getter ) )
            this.__defineGetter__( k, c.bind( h ) );
          if ( ( c = h.setter ) )
            this.__defineSetter__( k, c.bind( h ) );
          h.config.call( h, config[k] );
        } else {
          this[k] = config[k];
        }
    }

    emu65xx = function ( config ) {
      var i = 0,
        a, cmd;
        
        this.configuration = new Configuration;
        this.memory = new Memory;
        this.interrupts = _interrupts;
        this.devices = _devices;

        this.__definedGetter__( 'memory', function ( ) { return _memory; } );
        this.__definedGetter__( 'interrupts', function ( ) { return Object.key( _interrupts ); } );
        this.__definedGetter__( 'devices', function ( ) { return Object.key( _devices ); } );

        /* if more args than run command parser
        while ( a = arguments[i++] )
          if ( a instanceof Object )
            _config.configure( a );
          else
            _DoCommand( a );
    };

  emu65xx.Configure = _Configure;
  emu65xx.Configure = _DoCommand;

  root.emu65xx = emu65xx;
} )( this || window );
