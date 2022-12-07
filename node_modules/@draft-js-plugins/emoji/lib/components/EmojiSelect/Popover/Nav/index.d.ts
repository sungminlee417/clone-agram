import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { EmojiPluginTheme, EmojiSelectGroup } from '../../../../index';
interface NavParams {
    theme: EmojiPluginTheme;
    groups: EmojiSelectGroup[];
    activeGroup: number;
    onGroupSelect(index: number): void;
}
declare const Nav: {
    ({ theme, groups, activeGroup, onGroupSelect, }: NavParams): ReactElement;
    propTypes: {
        theme: PropTypes.Validator<object>;
        groups: PropTypes.Validator<(object | null | undefined)[]>;
        activeGroup: PropTypes.Validator<number>;
        onGroupSelect: PropTypes.Validator<(...args: any[]) => any>;
    };
};
export default Nav;
