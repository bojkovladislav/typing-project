import { THEMES } from '../../constants';

function Settings() {
  return (
    <div className="flex flex-col gap-10">
      <div></div>

      {/* a global object with settings will be displayed here */}
    </div>
  );
}

export default Settings;

type Setting<T> = {
  description: string;
  value: T;
};

type Toggle = 'off' | 'on';
type ShowHide = 'hide' | 'show';

interface GlobalSettings {
  behavior: {
    test_difficulty: Setting<'normal' | 'expert' | 'master'>;
    quick_restart: Setting<'off' | 'tab' | 'esc' | 'enter'>;
    blind_mode: Setting<Toggle>;
  };
  input: {
    freedom_mode: Setting<Toggle>;
    stop_on_error: Setting<'off' | 'word' | 'letter'>;
  };
  appearance: {
    smooth_the_scroll: Setting<Toggle>;
    typing_speed_unit: Setting<'wpm' | 'cpm' | 'wps' | 'cps'>;
    font_size: Setting<number>;
    font_family: Setting<string>;
  };
  theme: {
    theme: typeof THEMES;
  };
  hide_elements: {
    key_tips: Setting<ShowHide>;
    caps_lock_warning: Setting<ShowHide>;
  };
  danger_zone: {
    import_export_settings: Setting<'import' | 'export'>;
  };
  reset_settings: Setting<'reset settings'>;
}

const settings = {};
