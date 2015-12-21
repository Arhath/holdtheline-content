"use strict";

// Handle Right Button events
function OnRightButtonPressed(event)
{
	//$.Msg("OnRightButtonPressed")

	var iPlayerID = Players.GetLocalPlayer();
	var mainSelected = Players.GetLocalPlayerPortraitUnit(); 
	var mPos = GameUI.GetCursorPosition();
	var GamePos = Game.ScreenXYToWorld(mPos[0], mPos[1]);
	var mouseEntities = GameUI.FindScreenEntities( mPos );
	mouseEntities = mouseEntities.filter( function(e) { return e.entityIndex != mainSelected; } )
	
	// Unit rightclick
	if (mouseEntities.length > 0)
	{
		var t = mouseEntities[0].entityIndex;
		GameEvents.SendCustomGameEventToServer( "unit_right_click", { pID: iPlayerID, mainSelected: mainSelected, mouseX: GamePos[0], mouseY: GamePos[1] , name: event, targetIndex: t})
	}
	else
	{
		GameEvents.SendCustomGameEventToServer( "unit_right_click", { pID: iPlayerID, mainSelected: mainSelected, mouseX: GamePos[0], mouseY: GamePos[1] , name: event})
	}
	
	return false;
}

function OnLeftButtonPressed(event)
{
	//$.Msg("OnRightButtonPressed")

	var iPlayerID = Players.GetLocalPlayer();
	var mainSelected = Players.GetLocalPlayerPortraitUnit(); 
	var mPos = GameUI.GetCursorPosition();
	var GamePos = Game.ScreenXYToWorld(mPos[0], mPos[1]);
	var mouseEntities = GameUI.FindScreenEntities( mPos );
	mouseEntities = mouseEntities.filter( function(e) { return e.entityIndex != mainSelected; } )
	
	// Unit rightclick
	
	GameEvents.SendCustomGameEventToServer( "unit_left_click", { pID: iPlayerID, mainSelected: mainSelected, mouseX: GamePos[0], mouseY: GamePos[1] , name: event})

	return false;
}

function IsBuilder(name) {
	return (name == "human_peasant" || name == "nightelf_wisp" || name == "orc_peon" || name == "undead_acolyte")
}

// Main mouse event callback
GameUI.SetMouseCallback( function( eventName, arg ) {
	var CONSUME_EVENT = true;
	var CONTINUE_PROCESSING_EVENT = false;
	var bDoubleClick = false
	//$.Msg("MOUSE: ", eventName, " -- ", arg, " -- ", GameUI.GetClickBehaviors())

	if ( GameUI.GetClickBehaviors() !== CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_NONE )
		return CONTINUE_PROCESSING_EVENT;

	if ( eventName === "pressed" || eventName === "doublepressed")
	{
		// Left-click
		if ( arg === 0 )
		{
			//OnLeftButtonPressed();
			//return CONTINUE_PROCESSING_EVENT;
			return OnLeftButtonPressed(eventName);
		}

		// Right-click
		if ( arg === 1 )
		{
			return OnRightButtonPressed(eventName);
		}
	}
	return CONTINUE_PROCESSING_EVENT;
} );
