import { ReducerAction } from '../types/reducerAction';

export function isReducerActionType(
  value: string
): value is ReducerAction['type'] {
  const actionTypes: ReducerAction['type'][] = [
    'init',
    'all',
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];
  return actionTypes.includes(value as ReducerAction['type']);
}
