import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Col, Pagination, Row } from 'antd';
import { ASelectInput, useUiSettingsContext } from "../../../../packages/ant-ui";


interface ILimitOption {
    label: string;
    value: number;
}

interface IListPaginationProps {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;

    limit?: ILimitOption;
    setLimit?: Dispatch<SetStateAction<ILimitOption>>;

    totalPages: number;
    totalResults: number;
    fromTo?: {
        from: number;
        to: number;
    };
    compact?: boolean;
    showQuickJumper?: boolean;
}

const defaultLimitOptions: Array<ILimitOption> = [
    {
        label: '10',
        value: 10,
    },
    {
        label: '15',
        value: 15,
    },
    {
        label: '20',
        value: 20,
    },
    {
        label: '25',
        value: 25,
    },
    {
        label: '50',
        value: 50,
    },
    {
        label: '100',
        value: 100,
    },
];

/**
 * Pagination component for lists
 * @param currentPage
 * @param setCurrentPage
 * @param totalPages
 * @param totalResults
 * @param fromTo
 * @param compact
 * @param limit
 * @param setLimit
 */
export function ListPagination({ currentPage, setCurrentPage, totalPages, fromTo, totalResults, compact = false, limit, setLimit, showQuickJumper }: IListPaginationProps) {
    const handlePageChange = useCallback(({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    }, []);

    const { size: configSize } = useUiSettingsContext();
    const size = useMemo(() => {
        switch (configSize) {
            case 'small':
            case 'medium': {
                return 'small';
            }
            default: {
                return 'default';
            }
        }
    }, [configSize]);

    if (totalPages > 1) {
        return (
            <Row>
                <Col lg={24}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                        <div >
                            {limit && !!setLimit && (
                                <div style={{
                                    width: 140,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                                >
                                    <div>Show</div>
                                    <ASelectInput
                                        size={configSize === 'large' ? 'large' : 'small'}
                                        style={{ minWidth: 60 }}
                                        preserveErrorSpace={false}
                                        labelInValue
                                        onChange={(value: ILimitOption | null) => {
                                            console.log("-> value", value);
                                            setCurrentPage(1);
                                            setLimit(value as ILimitOption);
                                        }}
                                        value={limit}
                                        options={defaultLimitOptions}
                                    />
                                    <div>Items</div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            {fromTo && (
                                <span >
                                    {fromTo.from}-{fromTo.to} of {totalResults}
                                </span>
                            )}
                            <Pagination size={size} pageSize={limit?.value ?? 10} showQuickJumper={showQuickJumper} showSizeChanger={false} current={currentPage} onChange={(page) => setCurrentPage(page)} total={totalResults} />
                        </div>
                    </div>
                </Col>
            </Row>

        );
    }

    return <></>;
}
