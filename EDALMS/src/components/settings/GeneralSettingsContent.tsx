
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const GeneralSettingsContent = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Course sales page settings</h2>
        <div className="flex items-start space-x-2">
          <Checkbox id="skip-sales" />
          <div>
            <label htmlFor="skip-sales" className="font-medium cursor-pointer text-sm">
              Skip course sales page for free tickets
            </label>
            <p className="text-sm text-gray-600">
              The course sales page is not shown when a learner purchases a free ticket to access a course
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Course audio/video settings</h2>
        <div className="flex items-start space-x-2">
          <Checkbox id="pause-media" />
          <div>
            <label htmlFor="pause-media" className="font-medium cursor-pointer text-sm">
              Pause audio/video
            </label>
            <p className="text-sm text-gray-600">
              Pause audio/video when learners are not actively engaged with the course. When learners scroll down or move out of the browser tab, the audio/video will be paused.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="playback-speed" />
          <div>
            <label htmlFor="playback-speed" className="font-medium cursor-pointer text-sm">
              Playback speed
            </label>
            <p className="text-sm text-gray-600">
              Allow learners to control video playback speed.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Learner's account deletion</h2>
        <div className="flex items-start space-x-2">
          <Checkbox id="allow-deletion" />
          <div>
            <label htmlFor="allow-deletion" className="font-medium cursor-pointer text-sm">
              Allow learners to delete their own academy account.
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Set Multi-Factor Authentication</h2>
        <div className="flex items-start space-x-2">
          <a href="#" className="text-primary text-sm hover:underline">Learn more</a>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="enable-mfa" />
          <div>
            <label htmlFor="enable-mfa" className="font-medium cursor-pointer text-sm">
              Enable Multi-Factor Authentication for learners
            </label>
            <p className="text-sm text-gray-600">
              Once enabled, learners must enter the valid time-based one-time password during sign in.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Delete Academy</h2>
        <p className="text-sm text-gray-600">
          Kindly click on the button below to delete this academy and all the data associated with this account.
        </p>
        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
          Delete Academy
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettingsContent;
