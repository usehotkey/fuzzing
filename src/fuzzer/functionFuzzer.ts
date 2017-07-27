import {AnyFunction} from "../_types/anyFunction.type";
import {cornerCaseNumberArray, nonConsequentNumberArray} from "../check/number/number";
import {isStrangeResult} from "../check/strangeResults";
import {getUndefined} from "../check/undefined/undefined";
import {Fuzzer, IFuzzer, IFuzzerParams} from "./fuzzer";

class FunctionFuzzer extends Fuzzer implements IFuzzer {
    protected readonly params: IFuzzerParams;
    private func: AnyFunction;

    private constructor(func: AnyFunction, params: IFuzzerParams) {
        super();
        this.func = func;
        this.params = params;
    }

    public static create(func: AnyFunction, params: IFuzzerParams): FunctionFuzzer {
        return new FunctionFuzzer(func, params);
    }

    public fuzz(): Fuzzer {
        for (let i = 0; i < this.params.length; i += 1) {
            const param = this.params[i];
            this.fuzzIteration(param);
        }

        return this;
    }

    protected fuzzIteration(param: any): void {
        try {
            const result = this.func(param);

            if (isStrangeResult(result)) {
                this.collector.addWarning({
                    description: `Danger result: ${result}. Check function implementation`,
                    param,
                    result,
                });
            } else {
                this.collector.addResult({
                    description: `Normal result.`,
                    param,
                    result,
                });
            }
        } catch (error) {
            this.collector.addError({
                description: `Function execution failed.`,
                error,
                param,
            });
        }
    }
}

export function functionNumberArrayFuzzer(func: AnyFunction): FunctionFuzzer {
    return FunctionFuzzer.create(
        func,
        [
            getUndefined(),
            nonConsequentNumberArray(),
            cornerCaseNumberArray(),
        ],
    );
}

export function functionFuzzer(func: AnyFunction): FunctionFuzzer {
    return FunctionFuzzer.create(
        func,
        [
            getUndefined(),
            nonConsequentNumberArray(),
            cornerCaseNumberArray(),
            ...cornerCaseNumberArray(),
        ],
    );
}
