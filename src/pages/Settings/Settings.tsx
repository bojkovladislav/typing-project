function Settings() {
  return (
    <div className="flex flex-col gap-10">
      <div></div>

      {/* a global object with settings will be displayed here */}
    </div>
  );
}

export default Settings;

interface Global_Settings {
  behavior: {
    test_difficulty: {
      description: string;
      value: 'normal' | 'expert' | 'master';
    };
    quick_restart: {
      description: string;
      value: 'off' | 'tab' | 'esc' | 'enter';
    };
    blind_mode: {
      description: string;
      value: 'off' | 'on';
    };
  };
  input: {
    freedom_mode: {
      description: string;
      value: 'off' | 'on';
    };
    stop_on_error: {
      description: string;
      value: 'off' | 'word' | 'letter';
    };
  };
  appearance: {};
}

const settings = {};
